"use client"

import styles from "./Form.module.css";
import React, { ReactNode } from "react";

interface Props {
    className?: string;
    title: string;
    info: string;
    infoStatus: "error" | "success" | "default";
    children: ReactNode;
}

const Form = (props: Props) => {
    return (
        <div className={`${styles.form} ${props.className}`}>
            <div className={styles.children}>
                <h3 className={styles.form__title}>
                    {props.title}
                </h3>
                {props.children}
            </div>
            <small className={props.infoStatus === "error" ? `${styles.form__info} ${styles.error}` : props.infoStatus === "success" ? `${styles.form__info} ${styles.success}` : `${styles.form__info}`}>
                {props.info}
            </small>
        </div>
    )
}

export default Form;