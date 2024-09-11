"use client";

import styles from "./toast.module.css";
import "../../styles/fonts.css";

import Image from "next/image";
import { useState } from "react";
import Success from "@/icons/success";
import Failure from "@/icons/failure";

interface Props {
    type: "success" | "error";
    title: string;
    message: string;
}

const Toast = (props: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (
        <div className={`${styles.toast} ${isVisible ? "" : styles.active}`}>
            <div className={styles.close} onClick={() => setIsVisible(false)}>
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
                    {props.message}
                </div>
            </div>
        </div>
    );
};

export default Toast;
