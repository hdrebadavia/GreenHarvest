import React from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error'; // Toast type (success or error)
  onClose: () => void; // Callback to close the toast
}

const Toast: React.FC<ToastProps> = ({ show, message, type = 'success', onClose }) => {
  return (
    <div
      className={`toast-container position-fixed top-0 end-0 p-3`}
      style={{ zIndex: 1055 }}
    >
      <div
        className={`toast align-items-center text-bg-${type} ${show ? 'show' : 'hide'}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;