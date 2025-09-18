"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log("1. パスワードを送信します:", password);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    console.log("2. APIからレスポンスを受け取りました。ステータス:", res.status);

    if (res.ok) {
      console.log("3. ログイン成功。/admin/dashboardへ移動します...");
      router.push('/admin/dashboard');
      console.log("4. router.pushが呼び出されました。");
    } else {
      console.error("3. ログイン失敗。");
      setError('パスワードが違います。');
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
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-primary rounded-md">
          Enter
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}