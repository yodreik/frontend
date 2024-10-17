import React, { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button className={styles.modalCloseButton} onClick={onClose}>
                    Close
                </button>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
