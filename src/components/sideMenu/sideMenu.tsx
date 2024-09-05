"use client"

import { useEffect, useState } from "react";
import styles from "./sideMenu.module.css";

interface Props {
    isActive: boolean;
}

const SideMenu = (props: Props) => {
    // const [isActive, setIsActive] = useState<boolean>(false);
    useEffect(() => {
        if (props.isActive){
            console.log("33213123")
        }
    }, [props.isActive])

    return (
        <div className={styles.container}>
            <div className={`${styles.menu} ${props.isActive ? "" : styles.active}`}>
                
            </div>
        </div>
    );
}

export default SideMenu;