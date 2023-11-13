import Modal from '@/app/components/modal/modal';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function EntriesModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  function handleClose() {
    router.back();
    // setEntries(null);
  }

  return <Modal onClose={handleClose}>{children}</Modal>;
}
