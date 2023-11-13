'use client';

import { Entries } from '@/components/entries/entries';
import { JobExtended } from '@/components/job-extended/job-extended';
import Modal from '@/components/modal/modal';
import { fetchEntries, fetchOneJob } from '@/services/api';
import { TEntry, TJob } from '@/utils/types';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function EntriesModal({ children }: { children: ReactNode }) {
  const params = useParams();
  const router = useRouter();



  function handleClose() {
    router.back();
    // setEntries(null);
  }

  return <Modal onClose={handleClose}>{children}</Modal>;
}
