'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError('Invalid password');
      return;
    }

    window.location.href = '/admin';
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="border border-zinc-800 p-6 rounded-xl w-80">
        <h1 className="text-xl mb-4 text-center">Admin Login</h1>

        <input
          type="password"
          placeholder="Admin password"
          className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button
          onClick={submit}
          className="w-full border border-zinc-500 py-2 rounded hover:bg-white hover:text-black"
        >
          Login
        </button>
      </div>
    </main>
  );
}
