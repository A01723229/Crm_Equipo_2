'use client';
import Link from 'next/link';

export default function LogInBox() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Log In</h2>
        <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
        <Link href="/login">
          <button className="bg-gray-600 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold w-full">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}

