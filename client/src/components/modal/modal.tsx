import Image from 'next/image';
import { useEffect, useRef } from 'react';
import iconClose from '../../../public/icon-close.svg';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: Props) {
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
      modalRef.current?.close();
      modalRef.current && modalRef.current?.showModal();
    } else {
      closeModal();
    }
  }, [children]);

  const closeModal = () => {
    console.log('CLOSED');
    modalRef.current?.close();
    onClose && onClose();
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
      className="fixed z-1000 rounded-xl backdrop:bg-gray-800/50 mt-10 flex w-full max-w-[696px]"
      onClick={handleOverlayClick}
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between mb-4 pt-2 px-5">
          <Image
            src={iconClose}
            alt="close modal"
            className=" absolute right-5 top-4 hover:cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="px-5 pb-6">
          {children}
          <div className="flex flex-row justify-end mt-2"></div>
        </div>
      </div>
    </dialog>
  );
  return modal;
}
