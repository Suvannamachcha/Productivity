import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Error logging in');
    else router.push('/file-manager');
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert('Error signing up');
    else alert('Signup successful, you can now log in.');
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4 w-80"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-80"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mb-2 rounded">
        Login
      </button>
      <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </div>
  );
}
