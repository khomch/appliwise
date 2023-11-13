'use client';

import { Entries } from '@/components/entries/entries';
import { JobExtended } from '@/components/job-extended/job-extended';
import Modal from '@/components/modal/modal';
import { fetchEntries, fetchOneJob } from '@/services/api';
import { TEntry, TJob } from '@/utils/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EntriesModal() {
  const [job, setJob] = useState<TJob | null>(null);
  const [entries, setEntries] = useState<TEntry[] | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof params.slug === 'string') {
      fetchOneJob(params.slug)
        .then((job) => setJob(job))
        .catch((err) => console.log('error', err));
      fetchEntries(params.slug)
        .then((entries) => setEntries(entries))
        .catch((err) => console.log('error', err));
    }
  }, []);

  function handleClose() {
    router.back();
    setEntries(null);
  }

  return (
    entries &&
    job && (
      <Modal onClose={handleClose}>
        <Entries entries={entries} job={job} setEntries={setEntries} />
      </Modal>
    )
  );
}
