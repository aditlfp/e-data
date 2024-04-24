import React from "react";

function Modal({ props, children, modalTitle }) {
  return (
    <div className="fixed inset-0 backdrop-blur-xl flex justify-center overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all">
      <div
        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:w-[40%] sm:mx-auto`}
      >
        <div className="m-5">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
