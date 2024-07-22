import React, { ReactNode } from "react";
import "./Modal.css";
import Button from "../Button/Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='button-end'>
          <Button
            onClick={onClose}
            text='X'
            size='small-button'
            color='secondary-button'
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
