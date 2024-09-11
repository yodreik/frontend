"use client";

import ToastContainer from '@/components/toastContainer/ToastContainer';
import React, { createContext, useContext, useState } from 'react';

interface Toast {
    type: "success" | "error";
    title: string;
    message: string;
}

interface ToastContextType {
    success: (title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const success = (title: string, message: string) => {
        setToasts((items) => [...items, { type: "success", title, message }]);
    };

    return (
        <ToastContext.Provider value={{ success }}>
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
