import { createPortal } from 'react-dom';
import { RxCross1 } from 'react-icons/rx';

const Modal = ({ children, setModal }) => {
  return createPortal(
    <div
      onClick={() => setModal(false)}
      className="z-[100] fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <button
        onClick={() => setModal(false)}
        className="absolute right-3 top-3 text-white text-xl font-bold cursor-pointer"
      >
        <RxCross1 />
      </button>
      {children}
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
