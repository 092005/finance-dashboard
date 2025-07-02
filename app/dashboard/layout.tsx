'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  return (
    <div className="flex h-screen bg-black">
      <div className="w-72 flex-none">
        <SideNav />
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}