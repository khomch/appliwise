'use client';

import { JobExtended } from '@/app/components/job-extended/job-extended';
import Modal from '@/app/components/modal/modal';
import { fetchOneJob } from '@/services/api';
import { TJob } from '@/utils/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DetailsModal() {
  const [jobToRender, setJobToRender] = useState<TJob | null>(null);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'backlog';

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
        <JobExtended
          job={jobToRender}
          closeModal={handleClose}
          status={status}
        />
      </Modal>
    )
  );
}
