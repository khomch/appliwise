'use client';

import { Entries } from '@/app/dashboard/components/entries/entries';
import Modal from '@/components/modal/modal';
import { fetchEntries, fetchOneJob } from '@/services/job.service';
import { TEntry, TJob } from '@/types/types';
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
