'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useRef, useEffect } from 'react';
import iconClose from '../../../../public/icon-close.svg';
import Image from 'next/image';

const SHOW_DIALOG = 'showDialog';
const YES = 'y';

type Props = {
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

export default function Dialog({ title, onClose, onOk, children }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get(SHOW_DIALOG);

  useEffect(() => {
    if (showDialog === 'y') {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    console.log('CLOSED');

    dialogRef.current?.close();
    router.back();
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  const dialog: JSX.Element | null =
    showDialog === YES ? (
      <dialog
        ref={dialogRef}
        className="fixed z-1000 rounded-xl backdrop:bg-gray-800/50 mt-10"
      >
        <div className="w-[696px] bg-appmodalbg  flex flex-col">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5">
            <h1 className="text-xl font-medium truncate mt-2">{title}</h1>
            <Image
              src={iconClose}
              alt="close modal"
              className=" hover:cursor-pointer"
              onClick={closeDialog}
            />
          </div>
          <div className="px-5 pb-6">
            {children}
            <div className="flex flex-row justify-end mt-2">
              {/* <button
                onClick={clickOk}
                className="bg-green-500 py-1 px-2 rounded border-none"
              >
                OK
              </button> */}
            </div>
          </div>
        </div>
      </dialog>
    ) : null;

  return dialog;
}
