import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/core/CustomCursor';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*]/.test(pwd);

    return (
      pwd.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const passwordStrength = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, fullName);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const isPasswordValid = Object.values(passwordStrength).every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <CustomCursor />

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Header */}
        <div className="bg-white rounded-t-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join the Incredible India community</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="••••••••"
                required
              />

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3 space-y-1 text-xs">
                  <p className={`flex items-center gap-2 ${passwordStrength.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.minLength ? '✓' : '○'} At least 8 characters
                  </p>
                  <p className={`flex items-center gap-2 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.uppercase ? '✓' : '○'} Uppercase letter
                  </p>
                  <p className={`flex items-center gap-2 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.lowercase ? '✓' : '○'} Lowercase letter
                  </p>
                  <p className={`flex items-center gap-2 ${passwordStrength.numbers ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.numbers ? '✓' : '○'} Number
                  </p>
                  <p className={`flex items-center gap-2 ${passwordStrength.specialChar ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordStrength.specialChar ? '✓' : '○'} Special character (!@#$%^&*)
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="••••••••"
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-600 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition disabled:opacity-50 text-sm mt-6"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>

        {/* Card Footer - Info Box */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-b-2xl shadow-2xl p-6">
          <div className="space-y-2 text-sm">
            <p className="font-semibold">🎉 Join Incredible India!</p>
            <p>Unlock access to:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-100">
              <li>Explore millions of destinations</li>
              <li>Plan your perfect route</li>
              <li>Find best hotels & places</li>
              <li>AI-powered travel guides</li>
              <li>Save your favorite trips</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
