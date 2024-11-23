"use client";

import { ChangeEvent } from "react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Input.module.css";

interface Props {
    className?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    status?: "error" | "default";
    placeholder?: string;
    disabled?: boolean;
}

const Input = (props: Props) => {
    const { theme } = useTheme();
    
    return (
        <input
            className={
                props.status === "error"
                ? `${styles.input} ${styles[theme]} ${props.className} ${styles.inputError}`
                : `${styles.input} ${styles[theme]} ${props.className}`
            }
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
        />
    );
};

export default Input;
