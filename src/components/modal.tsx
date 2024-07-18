import { ReactNode } from 'react';

import { X } from 'lucide-react';

interface ModalProps {
  children: ReactNode;
  content: {
    title: string;
    subtitle: string;
  };
  closeModal: () => void;
}

export function Modal({ children, closeModal, content, ...props }: ModalProps) {
  return (
    <div
      {...props}
      className="fixed inset-0 bg-black/60 flex items-center justify-center"
    >
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{content.title}</h2>
            <X onClick={closeModal} className="size-5" />
          </div>
          <p className="text-sm text-zinc-400 ">{content.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
    </div>
  );
}
