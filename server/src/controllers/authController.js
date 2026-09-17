import User from '../models/User.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';

const REFRESH_COOKIE = 'rf_refresh';
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

async function issueTokens(res, user) {
  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());

  user.refreshTokens.push(refreshToken);
  await user.save();

  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions);
  return accessToken;
}

export async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }

  const user = new User({ name, email });
  await user.setPassword(password);
  await user.save();

  const accessToken = await issueTokens(res, user);
  res.status(201).json({ accessToken, user: user.toSafeJSON() });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.checkPassword(password))) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }

  const accessToken = await issueTokens(res, user);
  res.json({ accessToken, user: user.toSafeJSON() });
}

export async function refresh(req, res) {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (!token) return res.status(401).json({ error: 'No refresh token' });

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ error: 'Invalid or expired refresh token' });
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.refreshTokens.includes(token)) {
    return res.status(401).json({ error: 'Refresh token not recognized' });
  }

  // rotate: drop the old one, issue a new pair
  user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
  const accessToken = await issueTokens(res, user);
  res.json({ accessToken, user: user.toSafeJSON() });
}

export async function logout(req, res) {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (token) {
    await User.findByIdAndUpdate(req.userId, { $pull: { refreshTokens: token } });
  }
  res.clearCookie(REFRESH_COOKIE, cookieOptions);
  res.status(204).end();
}
