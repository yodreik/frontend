"use client";

import Toast from "../toast/toast";
import styles from "./ToastContainer.module.css";

interface toast {
    type: "success" | "error";
    title: string;
    message: string;
}

interface ToastProps {
    type: "success" | "error";
    title: string;
    message: string;
}

interface ToastContainerProps {
    toasts: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
    return (
        <div className={styles.container}>
            {toasts.map((toast, index) => (
                <div className={styles.toast}>
                    <Toast type={toast.type} title={toast.title} message={toast.message} />
                </div>
            ))}
        </div>
    );
}

export default ToastContainer;