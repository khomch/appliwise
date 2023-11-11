'use client';

import Modal from '@/components/modal/modal';

type InfoModalProps = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  onOk: () => void;
};

export default function InfoModal(props: InfoModalProps) {
  return (
    <>
      <Modal title={props.title} onClose={props.onClose} onOk={props.onOk}>
        {props.children}
      </Modal>
    </>
  );
}
