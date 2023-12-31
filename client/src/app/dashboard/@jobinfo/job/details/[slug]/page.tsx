'use client';

import { JobExtended } from '@/app/dashboard/components/job-extended/job-extended';
import Modal from '@/components/modal/modal';
import { fetchOneJob } from '@/services/job.service';
import { TJob } from '@/types/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DetailsModal() {
  const [jobToRender, setJobToRender] = useState<TJob | null>(null);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const columnId = searchParams.get('columnId');

  useEffect(() => {
    if (typeof params.slug === 'string') {
      fetchOneJob(params.slug)
        .then((job) => setJobToRender(job))
        .catch((err) => console.log('error', err));
    }
  }, []);

  function handleClose() {
    router.back();
    setJobToRender(null);
  }

  return (
    jobToRender && (
      <Modal onClose={handleClose}>
        {columnId && (
          <JobExtended
            job={jobToRender}
            closeModal={handleClose}
            columnId={columnId}
          />
        )}
      </Modal>
    )
  );
}
