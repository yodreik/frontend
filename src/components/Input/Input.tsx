"use client";

import "../../styles/fonts.css";
import { ChangeEvent } from "react";
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
    return (
        <input
            className={
                props.status === "error"
                ? `${styles.input} ${props.className} ${styles.inputError}`
                : `${styles.input} ${props.className}`
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
