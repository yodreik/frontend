import React, { ReactNode } from "react";
import styles from "./Modal.module.css";
import Close from "@/icons/close";

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
                <div className={styles.modalCloseButton} onClick={onClose}>
                    <Close />
                </div>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>

    );
};

export default Modal;
