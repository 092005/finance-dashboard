'use client';

import {
  HomeIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Overview', href: '/dashboard/overview', icon: HomeIcon },
  { name: 'Accounts', href: '/dashboard/accounts', icon: CreditCardIcon },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowsRightLeftIcon },
  { name: 'Budgets', href: '/dashboard/budgets', icon: ChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 p-3 text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-colors md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-red-600 text-white': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}