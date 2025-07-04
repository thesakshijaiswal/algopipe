import { IoCloseOutline } from "react-icons/io5";
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-violet-100 rounded-lg p-6 max-w-lg w-full shadow-xl relative">
        <button
          onClick={onClose}
          className="text-black px-2 py-1 rounded text-2xl absolute right-7 top-4"
        >
          <IoCloseOutline />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center text-black">{title}</h2>
        <div className="mb-4 p-4 bg-slate-800 rounded-2xl text-emerald-300">
          {children}
        </div>
      </div>
    </div>
  );
};
