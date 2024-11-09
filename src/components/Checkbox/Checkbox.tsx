"use client";

import styles from "./Checkbox.module.css";

interface Props {
    className?: string;
    label?: string;
    onClick?: () => void;
    isChecked: boolean;
}

const Checkbox = (props: Props) => {
    return (
        <button
            className={`${props.isChecked ? styles.checkedOn : styles.checkedOff} ${props.className}`}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export default Checkbox;
