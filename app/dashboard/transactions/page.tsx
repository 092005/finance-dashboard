'use client';

import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';

export default function Page() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-01-15', description: 'Grocery Shopping', category: 'Food', amount: -7000.00, type: 'Expense' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ description: '', category: 'Food', amount: '', type: 'Expense' });
  const [searchTerm, setSearchTerm] = useState('');
  
  const budgets = [
    { category: 'Food', limit: 40000, spent: 26000 },
    { category: 'Transportation', limit: 25000, spent: 15000 },
    { category: 'Entertainment', limit: 12000, spent: 8000 }
  ];
  
  const getBudgetInfo = (category: string) => {
    return budgets.find(b => b.category === category);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0));
  const netAmount = totalIncome - totalExpenses;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      description: formData.description,
      category: formData.category,
      amount: formData.type === 'Expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount)),
      type: formData.type
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({ description: '', category: 'Food', amount: '', type: 'Expense' });
    setShowForm(false);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-white`}>Transactions</h1>
        <div className="flex gap-4">
          <div className="bg-gray-800 rounded-lg px-3 py-2 border border-gray-700">
            <span className="text-xs text-gray-300">Income: </span>
            <span className="text-sm font-bold text-green-400">₹{totalIncome.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 border border-gray-700">
            <span className="text-xs text-gray-300">Expenses: </span>
            <span className="text-sm font-bold text-red-400">₹{totalExpenses.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-2 border border-gray-700">
            <span className="text-xs text-gray-300">Net: </span>
            <span className={`text-sm font-bold ${netAmount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{netAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            className="peer block w-full rounded-md border border-gray-600 bg-gray-800 text-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Add Transaction
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Income">Income</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                  Add Transaction
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-300 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-gray-200">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-gray-200">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-gray-200">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-gray-200">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-gray-200">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="w-full border-b border-gray-700 py-3 text-sm last-of-type:border-none">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 text-gray-300">
                      {transaction.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-white">
                      {transaction.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-300">
                      {transaction.category}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-3 ${transaction.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      ₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        transaction.type === 'Expense' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Budget Overview</h2>
          <div className="space-y-4">
            {budgets.map((budget, index) => {
              const percentage = Math.round((budget.spent / budget.limit) * 100);
              const isOverBudget = percentage > 100;
              return (
                <div key={index} className="rounded-xl bg-gray-800 p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-white">{budget.category}</h3>
                    <span className={isOverBudget ? 'text-red-400 text-xs' : 'text-gray-300 text-xs'}>{percentage}%</span>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">
                    ₹{budget.spent.toLocaleString('en-IN')} of ₹{budget.limit.toLocaleString('en-IN')}
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-700">
                    <div 
                      className={`h-1.5 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-red-600'}`} 
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}