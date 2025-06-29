'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
 
export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid credentials');
        setLoading(false);
      } else {
        router.push('/dashboard/overview');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong');
      setLoading(false);
    }
  }
 
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div>
          <label
            className="block text-sm font-semibold text-gray-200 mb-3"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              className="w-full bg-gray-700 border-2 border-gray-600 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
            />
            <AtSymbolIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-semibold text-gray-200 mb-3"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="w-full bg-gray-700 border-2 border-gray-600 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
            />
            <KeyIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      
      <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
        <ArrowRightIcon className="ml-2 h-5 w-5" />
      </Button>
      
      {error && (
        <div className="flex items-center space-x-3 text-red-600 bg-red-50 border border-red-200 rounded-2xl p-4">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </form>
  );
}