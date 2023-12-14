'use client';

import Loader from '@/components/ui/loader/loader';
import { useAuth } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
  jobinfo,
}: {
  jobinfo: React.ReactNode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const loaded = useAuth(router);
  return loaded ? (
    <>
      {children}
      {jobinfo}
    </>
  ) : (
    <div className="flex w-full justify-center mt-24">
      <Loader size="l" />
    </div>
  );
}
