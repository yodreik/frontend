"use client"

import React, { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Container.module.css";

interface Props {
    className?: string;
    children: ReactNode;
}

const Form = (props: Props) => {
    const { theme } = useTheme();

    return (
        <div className={`${styles.container} ${styles[theme]} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Form;