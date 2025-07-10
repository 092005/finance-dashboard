'use client';

import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';

export default function Page() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Checking Account', type: 'Checking', balance: 200000.00 }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'Checking', balance: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAccounts(accounts.map(account => 
        account.id === editingId 
          ? { ...account, name: formData.name, type: formData.type, balance: parseFloat(formData.balance) || 0 }
          : account
      ));
      setEditingId(null);
    } else {
      const newAccount = {
        id: accounts.length + 1,
        name: formData.name,
        type: formData.type,
        balance: parseFloat(formData.balance) || 0
      };
      setAccounts([...accounts, newAccount]);
    }
    setFormData({ name: '', type: 'Checking', balance: '' });
    setShowForm(false);
  };

  const handleEdit = (account: any) => {
    setFormData({ name: account.name, type: account.type, balance: account.balance.toString() });
    setEditingId(account.id);
    setShowForm(true);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-white`}>Accounts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            className="peer block w-full rounded-md border border-gray-600 bg-gray-800 text-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500"
        >
          Add Account
        </button>
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">{editingId ? 'Edit Account' : 'Add New Account'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Account Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Account Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Initial Balance</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => setFormData({...formData, balance: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                  {editingId ? 'Update Account' : 'Add Account'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-900 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-300 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-gray-200">
                    Account Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-gray-200">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-gray-200">
                    Balance
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="w-full border-b border-gray-700 py-3 text-sm last-of-type:border-none">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <p className="text-white">{account.name}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-300">
                      {account.type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-300">
                      ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => handleEdit(account)}
                          className="rounded-md border border-gray-600 p-2 hover:bg-gray-700 text-gray-300"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}