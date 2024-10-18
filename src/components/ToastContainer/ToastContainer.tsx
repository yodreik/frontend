"use client";

import Toast from "../Toast/Toast";
import styles from "./ToastContainer.module.css";

interface ToastProps {
    id: number;
    type: "success" | "error";
    title: string;
    message: string;
}

interface ToastContainerProps {
    toasts: ToastProps[];
}

const ToastContainer = (toasts: ToastContainerProps) => {
    return (
        <div className={styles.container}>
            {toasts.toasts.map((toast, index) => (
                <Toast key={index} id={toast.id} type={toast.type} title={toast.title} message={toast.message} />
            ))}
        </div>
    );
}

export default ToastContainer;