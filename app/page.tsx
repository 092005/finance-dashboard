import dynamic from 'next/dynamic';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

const FinanceLogo = dynamic(() => import('@/app/ui/finance-logo'), {
  loading: () => <div className="h-12 w-48 bg-gray-800 animate-pulse rounded" />
});

export const metadata: Metadata = {
  title: 'FinanceTracker - Smart Personal Finance Management Dashboard',
  description: 'Transform your financial future with intelligent expense tracking, budget planning, and real-time insights. Start managing your money smarter today with our intuitive dashboard.',
  keywords: 'personal finance, budget tracker, expense management, financial dashboard, money management, budget planning',
  openGraph: {
    title: 'FinanceTracker - Smart Finance Management',
    description: 'Take control of your finances with intelligent tracking and budgeting',
    type: 'website',
    url: 'https://finance-dashboard-gules.vercel.app',
  },
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect('/dashboard/overview');
  }
  
  return (
    <main className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-16">
          <FinanceLogo />
          <Link
            href="/login"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Sign In
          </Link>
        </nav>
        
        <div className="text-center mb-20">
          <h1 className={`${lusitana.className} text-5xl md:text-7xl font-bold text-white mb-6`}>
            Smart Finance
            <span className="text-red-500"> Management</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Transform your financial future with intelligent expense tracking, budget planning, and real-time insights
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-lg"
          >
            Start Your Journey
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 rounded-3xl p-6 card-shadow border border-gray-700">
            <div className="w-12 h-12 bg-red-900 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Smart Budgeting</h2>
            <p className="text-gray-300">AI-powered budget recommendations that adapt to your spending patterns</p>
          </div>
          
          <div className="bg-gray-800 rounded-3xl p-6 card-shadow border border-gray-700">
            <div className="w-12 h-12 bg-red-900 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Real-time Analytics</h2>
            <p className="text-gray-300">Beautiful charts and insights that make your financial data crystal clear</p>
          </div>
          
          <div className="bg-gray-800 rounded-3xl p-6 card-shadow border border-gray-700">
            <div className="w-12 h-12 bg-red-900 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Goal Tracking</h2>
            <p className="text-gray-300">Set and achieve your financial goals with personalized milestone tracking</p>
          </div>
        </div>
      </div>
    </main>
  );
}