import { lusitana } from '@/app/ui/fonts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-lg md:text-xl text-white`}>
        Dashboard
      </h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium">Total Balance</h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
            ₹10,20,000
          </p>
        </div>
        
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium">Monthly Income</h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
            ₹4,25,000
          </p>
        </div>
        
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium">Monthly Expenses</h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
            ₹3,10,000
          </p>
        </div>
        
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium">Savings</h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
            ₹7,08,000
          </p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="md:col-span-4">
          <h2 className="mb-4 text-xl md:text-2xl">Recent Transactions</h2>
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-center text-gray-500">No transactions yet</p>
          </div>
        </div>
      </div>
    </main>
  );
}