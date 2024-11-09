"use client";

import EnabledCheckbox from "@/icons/enabledCheckbox";
import styles from "./Checkbox.module.css";

interface Props {
    className?: string;
    label?: string;
    onClick?: () => void;
    isChecked: boolean;
}

const Checkbox = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.button} onClick={props.onClick}>
                { 
                    props.isChecked ? 
                    <EnabledCheckbox/>:
                    <div className={styles.disabledCheckbox}/> 
                }
            </div>
            <div className={styles.label}>
                {props.label}
            </div>
        </div>
    );
};

export default Checkbox;
