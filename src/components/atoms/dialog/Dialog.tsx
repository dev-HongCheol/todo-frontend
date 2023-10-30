'use client';

import { Dialog as Modal, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

type DialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
  closeBtn?: {
    label: string;
    className: string;
  };
};

const Dialog = ({ isOpen, setIsOpen, title, children, closeBtn }: DialogProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Modal as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Modal.Panel className="bg-secondary w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                <Modal.Title as="h3" className="text-lg font-bold leading-normal">
                  {title}
                </Modal.Title>
                <div className="mt-2">{children}</div>
                {closeBtn && (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {closeBtn.label}
                    </button>
                  </div>
                )}
              </Modal.Panel>
            </Transition.Child>
          </div>
        </div>
      </Modal>
    </Transition>
  );
};

export default Dialog;
