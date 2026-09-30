import { useEffect } from 'react';
import { X } from 'lucide-react';

// Simple popup window used for the Edit form and the Delete confirmation
function Modal({ title, onClose, children, size = 'large' }) {
  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation stops clicks inside the box from closing the modal */}
      <div className={`modal modal-${size}`} onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
