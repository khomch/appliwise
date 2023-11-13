'use client';

import { Entries } from '@/app/components/entries/entries';
import Modal from '@/app/components/modal/modal';
import { fetchEntries, fetchOneJob } from '@/services/api';
import { TEntry, TJob } from '@/utils/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { JobExtended } from '@/app/components/job-extended/job-extended';

export default function AddJob() {
  const jobToRender: TJob = {
    id: '',
    columnId: '',
    createdAt: '',
    updatedAt: '',
    url: '',
    img: '',
    position: '',
    company: '',
    prevId: null,
    nextId: null,
  };

  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'backlog';
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Modal onClose={handleClose}>
      <JobExtended
        job={jobToRender}
        closeModal={handleClose}
        isNew={true}
        status={status}
      />
    </Modal>
  );
}
