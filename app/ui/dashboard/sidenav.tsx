import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import FinanceLogo from '@/app/ui/finance-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOutAction } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gray-900 relative">
      <div className="absolute top-0 right-0 w-8 h-full bg-red-600 transform skew-x-12 origin-top"></div>
      
      <div className="relative z-10 p-6 border-b border-gray-700">
        <Link href="/" className="block">
          <FinanceLogo />
        </Link>
      </div>
      
      <div className="relative z-10 flex-1 px-4 py-6">
        <NavLinks />
      </div>
      
      <div className="relative z-10 p-4 border-t border-gray-700">
        <form action={signOutAction}>
          <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
            <PowerIcon className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}