import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import HeaderDashboard from './components/Header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
     <HeaderDashboard session={session} />

      <main className="pt-16">
        <div className="container mx-auto px-6">
          {children}
        </div>
      </main>
    </div>
  );
}