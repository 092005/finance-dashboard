import SideNav from '@/app/ui/dashboard/sidenav';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: React.ReactNode }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      redirect('/login');
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
  } catch (error) {
    console.error('Dashboard layout error:', error);
    redirect('/login');
  }
}