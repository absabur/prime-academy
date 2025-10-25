import { createPortal } from 'react-dom';
import { RxCross1 } from 'react-icons/rx';

const Modal = ({ children, setModal, noClose = false }) => {
  return createPortal(
    <div
      onClick={() => setModal(noClose ? true : false)}
      className="z-[100] fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setModal(false);
        }}
        className="absolute right-3 top-3 text-white text-xl font-bold cursor-pointer"
      >
        <RxCross1 />
      </button>

      {/* modal content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-4 max-w-[95vw] max-h-[90vh] overflow-auto"
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
