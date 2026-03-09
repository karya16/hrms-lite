import { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="relative bg-[#1f2638] p-[40px] rounded-xl w-[300px] animate-[fadeIn_0.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-[15px] top-[15px] text-white text-[20px]"
          onClick={onClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
