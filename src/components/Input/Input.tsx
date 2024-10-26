"use client";

import "../../styles/fonts.css";
import { ChangeEvent } from "react";
import styles from "./Input.module.css";
import Cross from "@/icons/cross";
import Tick from "@/icons/tick";

interface Props {
    className?: string;
    title?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    status?: "error" | "default";
    errorMessage?: string;
    successMessage?: string;
    placeholder?: string;
    disabled?: boolean;
}

const Input = (props: Props) => {
    return (
        <div>
            {
                props.title ?
                    <div className={props.status === "error" ? styles.titleError : styles.title}>
                        {props.title}
                    </div>
                    : <></>
            }
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

            <div style={{ minHeight: "20px", paddingLeft: "10px", marginTop: "5px" }}>
                {
                    props.errorMessage ?
                        <div style={{ display: "flex", alignItems: "center", color: "var(--red)", marginLeft: "auto", gap: "7px" }}><Cross className={styles.cross} />{props.errorMessage}</div> :
                        props.successMessage ?
                            <div style={{ display: "flex", alignItems: "center", color: "var(--green)", marginLeft: "auto", gap: "7px" }}><Tick className={styles.tick} />{props.successMessage}</div> :
                            <></>
                }
            </div>
        </div >
    );
};

export default Input;
