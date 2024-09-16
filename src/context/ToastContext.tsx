"use client";

import ToastContainer from '@/components/ToastContainer/ToastContainer';
import React, { createContext, useContext, useState } from 'react';

interface Toast {
    id: number;
    type: "success" | "error";
    title: string;
    message: string;
}

interface ToastContextType {
    success: (title: string, message: string) => void;
    removeToast: (index: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [counter, setCounter] = useState<number>(0);
    const [toasts, setToasts] = useState<Toast[]>([]);

    const success = (title: string, message: string) => {
        setToasts((items) => [...items, { id: counter, type: "success", title, message }]);
        const curIndex = counter;
        console.log("counter" + counter);
        setTimeout(() => {
            removeToast(curIndex);
        }, 3000)
        setCounter(counter + 1);
    };

    const removeToast = (index: number) => {
        setToasts((items) => items.filter((toast) => toast.id !== index));
        console.log(toasts)
    }

    return (
        <ToastContext.Provider value={{ success, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
