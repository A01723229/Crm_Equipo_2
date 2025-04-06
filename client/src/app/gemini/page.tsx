'use client';

import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function GeminiPage() {
  const data = useData();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://crm-equipo-2.vercel.app/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data, question }),
      });

      const result = await res.json();
      setResponse(result.answer);
    } catch (error) {
      console.error(error);
      setResponse('Error communicating with Gemini.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pl-20 pr-6 pb-6 bg-gray-100 min-h-screen text-gray-800 space-y-6 container mx-auto">
      <h2 className="text-xl font-bold mb-4 text-black">Gemini Data Query</h2>

      <textarea
        className="w-full p-2 border rounded mb-4 text-black"
        placeholder="Ask a question about your data..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        className="bg-gray-600 text-white px-4 py-2 rounded"
        onClick={askGemini}
        disabled={loading}
      >
        {loading ? 'Asking...' : 'Ask Gemini'}
      </button>

      {response && (
        <div className="mt-4 p-3 border rounded bg-gray-100 text-black">
          <strong>Gemini says:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};