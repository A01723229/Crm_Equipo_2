'use client';

import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const { setUser } = useUser();

  const [sellerName, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('https://crm-equipo-2.vercel.app/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, company, sellerName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setUser({
        sellerName,
        company,
        role,
        email,
        isLogin: true,
      });

      console.log('Account Created');
      router.push("/");
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-6 mt-12 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Create Your Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input type="text" placeholder="Username" value={sellerName}
              className="w-full p-2 text-black placeholder-gray-300 border border-gray-400 rounded"
              onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Company</label>
            <input type="text" placeholder="Company" value={company}
              className="w-full p-2 text-black placeholder-gray-300 border border-gray-400 rounded"
              onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Role</label>
            <input type="text" placeholder="Role" value={role}
              className="w-full p-2 text-black placeholder-gray-300 border border-gray-400 rounded"
              onChange={(e) => setRole(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email address</label>
            <input type="email" placeholder="email@address.com" value={email}
              className="w-full p-2 text-black placeholder-gray-300 border border-gray-400 rounded"
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password}
                className="w-full p-2 text-black placeholder-gray-300 border border-gray-400 rounded"
                onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="absolute text-black right-2 top-1/2 transform -translate-y-1/2 text-sm"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full p-2 bg-black text-white rounded hover:bg-gray-800">Create Account</button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-600">Log in here</a>
        </p>
      </div>
    </div>
  );
}
