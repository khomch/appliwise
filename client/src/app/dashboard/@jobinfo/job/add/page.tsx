'use client';

import { JobExtended } from '@/app/dashboard/components/job-extended/job-extended';
import Modal from '@/components/modal/modal';
import { TJob } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const columnId = searchParams.get('columnId');
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Modal onClose={handleClose}>
      {columnId && (
        <JobExtended
          job={jobToRender}
          closeModal={handleClose}
          isNew={true}
          columnId={columnId}
        />
      )}
    </Modal>
  );
}
