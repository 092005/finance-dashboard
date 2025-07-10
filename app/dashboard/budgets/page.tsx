'use client';

import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';

export default function Page() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food & Dining', limit: 40000, spent: 26000, period: 'Monthly' },
    { id: 2, category: 'Transportation', limit: 25000, spent: 15000, period: 'Monthly' },
    { id: 3, category: 'Entertainment', limit: 12000, spent: 8000, period: 'Monthly' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category: 'Food', limit: '', period: 'Monthly' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget = {
      id: budgets.length + 1,
      category: formData.category,
      limit: parseFloat(formData.limit),
      spent: 0,
      period: formData.period
    };
    setBudgets([...budgets, newBudget]);
    setFormData({ category: 'Food', limit: '', period: 'Monthly' });
    setShowForm(false);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-white`}>Budgets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <button 
          onClick={() => setShowForm(true)}
          className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Create Budget
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">Create New Budget</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="Food">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Shopping">Shopping</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Budget Limit</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.limit}
                  onChange={(e) => setFormData({...formData, limit: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                  Create Budget
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.limit) * 100);
          const isOverBudget = percentage > 100;
          return (
            <div key={budget.id} className="rounded-xl bg-gray-800 p-6 shadow-sm border border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{budget.category}</h3>
                <span className="text-sm text-gray-400">{budget.period}</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">₹{budget.spent.toLocaleString('en-IN')} of ₹{budget.limit.toLocaleString('en-IN')}</span>
                  <span className={isOverBudget ? 'text-red-400' : 'text-gray-300'}>{percentage}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-700">
                  <div 
                    className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-red-600'}`} 
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}