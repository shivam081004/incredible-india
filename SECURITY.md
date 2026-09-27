# Security Guidelines - Incredible India

## ⚠️ CRITICAL: Never Commit Secrets

This is the most important rule. A secret committed to git is a secret compromised forever.

### What Are Secrets?

- API keys (Supabase, Google, Stripe, any service)
- Database passwords and connection strings
- JWT signing secrets
- OAuth client secrets
- Private keys (.pem, .key files)
- AWS/Azure/GCP credentials
- Passwords in any form
- Personal access tokens (GitHub, GitLab)
- Webhook signing keys

### How Secrets Are Leaked

```
❌ LEAKED: Committing .env file
git add .env
git commit -m "add env vars"
git push origin main
→ Secret is now in git history FOREVER

❌ LEAKED: Hardcoding in source
const API_KEY = "sk-1234567890abcdef";
export default MyComponent;
→ Secret in published code

❌ LEAKED: Committing package-lock.json with inline secrets
→ npm install scripts may contain embedded credentials

✅ SAFE: Using environment variables
process.env.DATABASE_URL // Loaded from .env.local (gitignored)

✅ SAFE: Using secrets manager
AWS Secrets Manager, Supabase Vault, HashiCorp Vault
```

### Recovery If Secrets Are Committed

If you accidentally commit a secret:

1. **Rotate immediately** - Change the compromised credential
2. **Purge git history** - Use `git filter-branch` or `git filter-repo`
3. **Notify team** - Alert everyone to rotation
4. **Review logs** - Check if credential was used maliciously

```bash
# Remove file from git history (DESTRUCTIVE)
git filter-branch --tree-filter 'rm -f .env' HEAD
git push origin main --force-with-lease
```

---

## Environment Variables

### Setup

1. **Create `.env.local` in both client/ and server/** (not committed)

```bash
# client/.env.local
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_OLLAMA_API_URL=http://localhost:11434
VITE_GOOGLE_CLIENT_ID=1234567890.apps.googleusercontent.com
```

```bash
# server/.env.local
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/incredible_india
JWT_SECRET=your_super_secret_key_minimum_32_chars_long
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
OLLAMA_API_URL=http://localhost:11434
GOOGLE_CLIENT_ID=1234567890.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
STRIPE_SECRET_KEY=sk_live_...
```

2. **Create `.env.example` (committed, NO VALUES)**

```bash
# .env.example - Template with no secrets
VITE_API_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_OLLAMA_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

3. **Add to `.gitignore`**

```
.env
.env.local
.env.*.local
.env.production
.env.development
```

### Accessing Environment Variables

**Frontend (Vite)**
```javascript
// Only variables prefixed with VITE_ are exposed
const apiUrl = import.meta.env.VITE_API_URL;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// These are safe - bundled with VITE_ prefix protection
console.log(apiUrl); // ✓ Frontend JS
```

**Backend (Node.js)**
```javascript
// All env vars are available (private)
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

// Never expose to client
res.json({ secret: process.env.JWT_SECRET }); // ❌ NEVER
```

### Variable Naming Convention

- **Public (expose to frontend)**: `VITE_*` prefix
- **Private (backend only)**: No prefix, or `_PRIVATE` suffix
- **Sensitive**: ALL_CAPS_UNDERSCORE_CASE
- **Temporary/Local**: Add comment `// dev only`

---

## Authentication & Authorization

### JWT Tokens

**Issued at login:**
```
POST /api/auth/login
→ Response: { token: "eyJhbGc...", user: {...} }
```

**Stored on client:**
```javascript
// ✓ SAFE: httpOnly cookie (server sets, browser cannot read)
// Backend sends: Set-Cookie: token=eyJhbGc...; HttpOnly; Secure; SameSite=Lax

// ❌ UNSAFE: localStorage (XSS can steal it)
localStorage.setItem('token', token); // Don't do this for auth
```

**Verified on backend:**
```javascript
// middleware/auth.js
const token = req.headers.authorization?.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // Attach to request
```

**Token Expiry:**
- Access token: 24 hours
- Refresh token: 7 days (in httpOnly cookie)
- Rotate refresh token on use

### Row-Level Security (RLS)

All user data is protected by PostgreSQL RLS policies:

```sql
-- Only users can see their own routes
CREATE POLICY users_can_see_own_routes
  ON routes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only users can insert/update/delete their own routes
CREATE POLICY users_can_modify_own_routes
  ON routes
  FOR UPDATE
  USING (auth.uid() = user_id);
```

**This means:**
- Even if someone bypasses the API layer, the database still enforces ownership
- A malicious user cannot access another user's trips/bookings
- Always pass `user_id` from JWT, never from client

---

## Input Validation

### At the API Boundary

**Before any processing:**
```javascript
// ✓ SAFE: Schema validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  from_city: z.string().min(2),
  to_city: z.string().min(2),
});

const data = schema.parse(req.body); // Throws if invalid
// Now data is typed and safe

// ❌ UNSAFE: No validation
const { email, password } = req.body;
await db.query(`SELECT * FROM users WHERE email = '${email}'`); // SQL injection risk!
```

### Validation Checklist

- [ ] All user input validated at route handler entry
- [ ] Schemas use Zod or similar library
- [ ] Invalid input rejected with 422 Unprocessable Entity
- [ ] Downstream code uses only validated, typed data
- [ ] Error messages don't leak internal details

### Common Validation Patterns

```javascript
// Email
z.string().email().toLowerCase()

// Password (must be hashed, never stored plaintext)
z.string().min(8).max(128)

// Numbers (prevent string injection)
z.string().regex(/^\d+$/).transform(Number)

// Enums (only allowed values)
z.enum(['Train', 'Bus', 'Flight', 'Car', 'Auto'])

// URLs (prevent SSRF)
z.string().url().refine(url => {
  const u = new URL(url);
  return ['https:', 'http:'].includes(u.protocol) &&
         !isPrivateIP(u.hostname);
})

// Dates (prevent time bombs)
z.string().datetime().refine(d => new Date(d) > new Date())
```

---

## Database Security

### Queries

**✓ SAFE: Parameterized queries**
```javascript
const { data } = await supabase
  .from('routes')
  .select('*')
  .eq('user_id', userId); // User ID is parameter, not concatenated
```

**❌ UNSAFE: String concatenation**
```javascript
// NEVER do this
const query = `SELECT * FROM routes WHERE user_id = ${userId}`;
// If userId = "1 OR 1=1", returns all routes!
```

### Connection Security

- **Use connection pooling** - Reuse connections
- **Set connection timeout** - Prevent hanging connections
- **Limit connections** - Prevent exhaustion attacks
- **Use strong passwords** - 32+ characters, random

### Sensitive Fields

Always strip sensitive fields before responding:

```javascript
// ❌ Returns password hash
const user = await db.users.findById(userId);
res.json(user); // { id, email, password_hash, ...}

// ✓ Safe: Remove sensitive fields
const { password_hash, ...safe } = user;
res.json(safe); // { id, email, ...}

// Or exclude in query
const user = await db.users
  .select('id', 'email', 'username') // Whitelist safe fields
  .findById(userId);
```

---

## API Security

### CORS (Cross-Origin Resource Sharing)

**✓ SAFE: Allowlist origins**
```javascript
const cors = require('cors');
app.use(cors({
  origin: [
    'https://incredible-india.com',
    'https://app.incredible-india.com',
    'http://localhost:3000', // dev only
  ],
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

**❌ UNSAFE: Wildcard with credentials**
```javascript
// This sends auth cookies to ANY origin!
app.use(cors({ origin: '*', credentials: true })); // NEVER
```

### Rate Limiting

Prevent brute force and DDoS:

```javascript
const rateLimit = require('express-rate-limit');

// General API limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per window
  store: new RedisStore(), // Shared across servers
});

// Strict for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 min
  skipSuccessfulRequests: true, // Don't count successes
});

app.use('/api/', limiter);
app.post('/api/auth/login', authLimiter, loginHandler);
```

### Security Headers

**Via Helmet.js:**
```javascript
const helmet = require('helmet');
app.use(helmet());
```

**Sets:**
- `Content-Security-Policy` - Only scripts from trusted sources
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Strict-Transport-Security` - Force HTTPS

---

## Password Security

### Hashing

**✓ SAFE: bcrypt with 12+ rounds**
```javascript
const bcrypt = require('bcryptjs');

// On registration
const salt = await bcrypt.genSalt(12); // 12 rounds (slow)
const hash = await bcrypt.hash(password, salt);
await db.users.create({ email, password_hash: hash });

// On login
const user = await db.users.findByEmail(email);
const match = await bcrypt.compare(password, user.password_hash);
if (match) { /* issue JWT */ }
```

**❌ UNSAFE: Plain passwords or weak hashing**
```javascript
await db.users.create({ email, password }); // NEVER store plaintext
const hash = crypto.md5(password); // MD5 is broken!
```

### Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)
- No common passwords (rockyou.txt blacklist)

---

## File Uploads

**✓ SAFE: Validate MIME type and content**
```javascript
const multer = require('multer');

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Also verify content (magic bytes)
const fileType = require('file-type');
const buffer = await upload.single('avatar')(req, res);
const type = await fileType.fromBuffer(buffer); // Verify real type
if (type?.mime !== file.mimetype) {
  throw new Error('File content does not match extension');
}
```

**❌ UNSAFE: Trust file extension**
```javascript
// Extension proves nothing
const ext = file.originalname.split('.').pop();
if (ext === 'jpg') { // User could rename .exe to .jpg
  // process
}
```

---

## Logging & Monitoring

### What to Log

✓ Security events:
- Login attempts (success and failure)
- Failed authorization checks
- RLS policy violations
- Invalid input submissions
- Rate limit exceeded

❌ Never log:
- Passwords
- API keys / tokens
- Credit card numbers
- Full personally identifiable information (PII)

### Secure Logging

```javascript
// ✓ SAFE: Log events without secrets
logger.info('User login successful', {
  userId: user.id,
  email: user.email, // OK if needed
  timestamp: new Date(),
});

// ❌ UNSAFE: Log credentials
logger.error('Login failed', { email, password }); // Never!

// ✓ SAFE: Log violations
logger.warn('RLS violation detected', {
  userId: req.user.id,
  attemptedResource: 'route:12345',
  reason: 'ownership_check_failed',
});
```

### Monitoring

- Real-time alerts for security events
- Failed login spikes (possible brute force)
- Unauthorized access attempts
- Rate limit violations
- Database connection errors

---

## Dependency Security

### Before Adding

1. **Check package reputation**
   - GitHub stars (1000+?)
   - Last updated (within 6 months?)
   - Maintenance status (active?)

2. **Run audit**
   ```bash
   npm audit
   ```

3. **Check for typos** (typosquatting)
   - `cross-env` vs `crossenv` ✓ Correct
   - `eslint-config-airbnb` vs `airbnb-eslint` ✓ Check twice

### Managing Dependencies

```bash
# Audit before every release
npm audit

# Fix minor/patch versions
npm audit fix

# For major version upgrades:
npm outdated # See what's available
npm update package-name@latest # One at a time
npm test # Verify it works
```

### Supply Chain Security

- **Pin exact versions** for security packages (bcrypt, jsonwebtoken, helmet)
- **Review lockfile diffs** - Unexpected changes = red flag
- **Verify package integrity** - npm provides checksums
- **No auto-approval** of install scripts - Review before running

---

## Secrets Management

### Local Development

```
.env.local (gitignored)
├── VITE_API_URL
├── DATABASE_URL
├── JWT_SECRET
└── GOOGLE_CLIENT_SECRET
```

### Staging/Production

Use a secrets manager:
- **Supabase Vault** (built-in to Supabase)
- **AWS Secrets Manager**
- **Azure Key Vault**
- **HashiCorp Vault**
- **GitHub Secrets** (for CI/CD)

**Never:**
- Store secrets in code
- Store secrets in git (even old commits)
- Email secrets to teammates
- Share in Slack/chat

---

## Pre-Deployment Checklist

- [ ] No `.env` files in git
- [ ] No hardcoded API keys in source code
- [ ] All sensitive fields stripped from API responses
- [ ] CORS configured with allowlist (no `*`)
- [ ] Rate limiting enabled on auth endpoints
- [ ] Security headers set (Helmet)
- [ ] HTTPS enforced
- [ ] Passwords hashed with bcrypt (12+ rounds)
- [ ] Input validation at all API boundaries
- [ ] SQL queries parameterized (no string concat)
- [ ] RLS policies enabled in database
- [ ] Error responses are generic (no internals)
- [ ] Logging does not contain secrets
- [ ] Dependencies audited (`npm audit`)
- [ ] No outdated high-severity packages

---

## Incident Response

If a security breach is suspected:

1. **Immediately rotate all secrets**
2. **Purge sensitive git history** (if needed)
3. **Check logs** for unauthorized access
4. **Notify affected users**
5. **Conduct postmortem** - What went wrong?
6. **Implement prevention** - Fix root cause
7. **Document** - Update this guide with lessons learned

---

## Resources

- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- [Zod Validation](https://zod.dev/)

---

## Questions?

If you're unsure whether something is a security risk, ask. Better safe than sorry.

Last updated: 2026-09-27
