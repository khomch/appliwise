'use client';

import Loader from '@/components/ui/loader/loader';
import { useAuth } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const loaded = useAuth(router);
  return loaded ? (
    <>{children}</>
  ) : (
    <div className="flex w-full justify-center mt-24">
      <Loader size="l" />
    </div>
  );
}
