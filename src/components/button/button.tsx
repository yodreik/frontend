"use client";

import styles from "./Button.module.css";

// TODO: Pass a color for button through a props, perfectly from globals.css
interface Props {
    className?: string;
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = (props: Props) => {
    return (
        <button
            className={`${styles.button} ${props.className}`}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export default Button;
