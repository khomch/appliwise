'use client';

import Loader from '@/components/ui/loader/loader';
import { useAppSelector, useAuth } from '@/hooks/hooks';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

export default function DashboardLayout(props: {
  jobinfo: React.ReactNode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const loaded = useAuth(router);
  const childrenSegments = useSelectedLayoutSegment('children');

  return loaded ? (
    <>
      {props.jobinfo}
      {!childrenSegments && props.children}
    </>
  ) : (
    <div className="flex w-full justify-center mt-24">
      <Loader size="l" />
    </div>
  );
}
