import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onConfirm,
  title,
  description,
  isOpen,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstElementRef = useRef<HTMLButtonElement | null>(null);
  const lastElementRef = useRef<HTMLButtonElement | null>(null);
  const [isOverlayClickDisabled, setOverlayClickDisabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isOverlayClickDisabled) {
      onClose();
    }
  };

  const handleModalClick = () => {
    setOverlayClickDisabled(true);
    setTimeout(() => {
      setOverlayClickDisabled(false);
    }, 300);
  };

  const handleTabKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      if (
        event.shiftKey &&
        document.activeElement === firstElementRef.current
      ) {
        event.preventDefault();
        lastElementRef.current?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElementRef.current
      ) {
        event.preventDefault();
        firstElementRef.current?.focus();
      }
    }
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            tabIndex={0}
            className="absolute size-full bg-black/50 outline-none"
            onClick={handleOverlayClick}
            onKeyDown={handleTabKeyPress}
          />
          <div
            className="relative z-10 size-full max-w-lg p-4 md:h-auto"
            onClick={handleModalClick}
          >
            <div
              className="relative rounded-lg bg-white p-4 shadow md:p-8"
              onKeyDown={handleTabKeyPress}
            >
              <div className="mb-4 font-light text-gray-500">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {title}
                </h3>
                <p>{description}</p>
              </div>
              <div>
                <div className="items-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                  <button
                    type="button"
                    onClick={onClose}
                    ref={firstElementRef}
                    className="ml-auto w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    ref={lastElementRef}
                    className="
                     w-full rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:w-auto"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
