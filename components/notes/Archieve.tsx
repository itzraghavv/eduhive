import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#000c] h-full">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl flex-1 max-h-[50%] overflow-hidden">
        <div className="overflow-y-scroll h-full p-6">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
