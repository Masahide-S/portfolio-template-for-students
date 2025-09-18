"use client";
import { useState } from 'react';
// useRouterは不要になります

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      // ページ全体をリロードして、新しいCookieを確実に反映させる
      window.location.href = '/admin/dashboard';
    } else {
      setError('パスワードが違います。');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-surface rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-base rounded-md"
        />
        <button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-semibold text-white bg-primary rounded-md disabled:opacity-50">
          {isLoading ? '...' : 'Enter'}
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}