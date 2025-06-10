import { getCurrentUser } from '@/lib/auth';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login'); // Redirect to login if not authenticated
  }

  return (
    <div className="min-h-screen gradient-bg">
      <DashboardSidebar user={user} />

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen">
        <div className="p-8 lg:p-12">
          <div className="pt-20 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}