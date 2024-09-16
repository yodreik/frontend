"use client";

import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import Success from "@/icons/success";
import Failure from "@/icons/failure";
import styles from "./Toast.module.css";

interface Props {
    id: number;
    type: "success" | "error";
    title: string;
    message: string;
}

const Toast = (props: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const { removeToast } = useToast();


    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            removeToast(props.id);
            setIsVisible(true);
        }, 300);
    }

    return (
        <div className={`${styles.toast} ${isVisible ? "" : styles.active}`}>
            <div className={styles.close} onClick={handleClose}>
                <Image src="/iconClose.svg" alt="Fire" width={24} height={24} />
            </div>

            <div className={styles.icon}>
                {
                    props.type === "success" ? <Success /> : < Failure />
                }
            </div>

            <div className={styles.content}>
                <div className={styles.title}>
                    {props.title}
                </div>
                <div className={styles.message}>
                    {props.id}
                </div>
            </div>
        </div>
    );
};

export default Toast;
