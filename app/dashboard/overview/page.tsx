'use client';

import { lusitana } from '@/app/ui/fonts';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [accounts] = useState([
    { id: 1, name: 'Checking Account', type: 'Checking', balance: 200000.00 },
    { id: 2, name: 'Savings Account', type: 'Savings', balance: 500000.00 }
  ]);
  
  const [transactions] = useState([
    { id: 1, amount: 50000, type: 'Income' },
    { id: 2, amount: -15000, type: 'Expense' },
    { id: 3, amount: -8000, type: 'Expense' }
  ]);
  
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);
  
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
  }
  
  if (!session) {
    return null;
  }
  
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = Math.abs(transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0));
  const savings = totalBalance - monthlyExpenses;
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-base md:text-lg text-white`}>
        Dashboard
      </h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-800 p-4 shadow-sm border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Total Balance</h3>
          <p className="text-2xl font-bold text-green-400">
            ₹{totalBalance.toLocaleString('en-IN')}
          </p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-4 shadow-sm border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Monthly Income</h3>
          <p className="text-2xl font-bold text-blue-400">
            ₹{monthlyIncome.toLocaleString('en-IN')}
          </p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-4 shadow-sm border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Monthly Expenses</h3>
          <p className="text-2xl font-bold text-red-400">
            ₹{monthlyExpenses.toLocaleString('en-IN')}
          </p>
        </div>
        
        <div className="rounded-xl bg-gray-800 p-4 shadow-sm border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Net Savings</h3>
          <p className={`text-2xl font-bold ${savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ₹{savings.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl text-white">Recent Transactions</h2>
          <div className="rounded-xl bg-gray-800 p-4 border border-gray-700">
            {transactions.slice(0, 5).map((transaction, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                <div>
                  <p className="text-white text-sm">{transaction.type === 'Income' ? 'Salary Credit' : 'Expense'}</p>
                  <p className="text-gray-400 text-xs">{new Date().toLocaleDateString()}</p>
                </div>
                <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="mb-4 text-xl text-white">Account Summary</h2>
          <div className="rounded-xl bg-gray-800 p-4 border border-gray-700">
            {accounts.map((account) => (
              <div key={account.id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                <div>
                  <p className="text-white text-sm">{account.name}</p>
                  <p className="text-gray-400 text-xs">{account.type}</p>
                </div>
                <p className="font-semibold text-green-400">
                  ₹{account.balance.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}