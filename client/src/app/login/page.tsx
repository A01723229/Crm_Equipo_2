'use client';

import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('https://crm-equipo-2.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }
      setUser({
        sellerName: data.seller.name,
        company: data.seller.company,
        role: data.seller.role,
        email: data.seller.email,
        isLogin: true,
      });

      console.log('Logged in');
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-6 mt-12 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Log in</h2>
        <p className="text-center text-gray-600 mb-4">Log in by entering your email address and password.</p>
        
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email address</label>
            <input
              type="email"
              placeholder="email@address.com"
              value={email}
              className="w-full p-2 text-black placeholder-gray-300 border border-gray-400 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                className="w-full p-2 text-black placeholder-gray-300 border border-gray-400 rounded"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-blue-600">Forgot password?</a>
          </div>
          <button type="submit" className="w-full p-2 bg-black text-white rounded hover:bg-gray-800">
            Log in
          </button>
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" id="rememberMe" />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600">Sign up here</a>
        </p>
      </div>
    </div>
  );
}
