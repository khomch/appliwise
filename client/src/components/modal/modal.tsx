'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import iconClose from '../../../public/icon-close.svg';

type Props = {
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, onClose, onOk, children }: Props) {
  const modalRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (children) {
      modalRef.current?.showModal();
    } else {
      closeModal();
    }
  }, [children]);

  const closeModal = () => {
    console.log('CLOSED');
    modalRef.current?.close();
    onClose && onClose();
  };

  const clickOk = () => {
    onOk();
    closeModal();
  };

  const handleOverlayClick: React.MouseEventHandler<HTMLDialogElement> = (
    e
  ) => {
    if (e.currentTarget === e.target) {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }
  };

  const modal: React.ReactNode = children && (
    <dialog
      ref={modalRef}
      className="fixed z-1000 rounded-xl backdrop:bg-gray-800/50 mt-10"
      onClick={handleOverlayClick}
    >
      <div className="w-[696px] bg-appmodalbg  flex flex-col">
        <div className="flex flex-row justify-between mb-4 pt-2 px-5">
          <h1 className="text-xl font-medium truncate mt-2">{title}</h1>
          <Image
            src={iconClose}
            alt="close modal"
            className=" hover:cursor-pointer"
            onClick={closeModal}
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
  );
  return modal;
}
