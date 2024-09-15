"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import Image from "next/image";
import styles from "./sideMenu.module.css";


interface Props {
    isActive: boolean;
    setInactive: () => void;
    username: string;
    email: string;
    avatarURL: string;
}

const SideMenu = (props: Props) => {
    const { setIsAuthorized } = useAuth();

    const router = useRouter();

    const handleLogout = () => {
        props.setInactive();
        localStorage.removeItem("token");
		setIsAuthorized(false);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.menu} ${props.isActive ? styles.active : ""}`}>
                <button className={styles.closeButton} onClick={props.setInactive}>
                    <Image src="/iconClose.svg" alt="Close" width={24} height={24} />
                </button>

                <div className={styles.miniProfile}>
                    <img src={props.avatarURL} className={styles.avatar} />
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{props.username}</div>
                        <div className={styles.userEmail}>{props.email}</div>
                    </div>
                </div>
                
                <hr className={styles.separator} />

                <div className={styles.itemsContainer}>
                    <button className={styles.item} onClick={() => {router.push("/")}}>
                        <Image src="/iconProfile.svg" alt="Profile" width={24} height={24} />
                        <div className={styles.item_title}>Profile</div>
                    </button>

                    <button className={styles.item} onClick={() => {router.push("/")}}>
                        <Image src="/iconDashboard.svg" alt="Dashboard" width={24} height={24} />
                        <div className={styles.item_title}>Dashboard</div>
                    </button>

                    <button className={styles.item} onClick={() => {router.push("/")}}>
                        <Image src="/iconSettings.svg" alt="Settings" width={24} height={24} />
                        <div className={styles.item_title}>Settings</div>
                    </button>
                </div>

                <hr className={styles.separator} />

                <div className={styles.itemsContainer}>
                    <button className={styles.item} onClick={handleLogout}>
                        <Image src="/iconExit.svg" alt="Exit" width={24} height={24} />
                        <div className={styles.item_titleRed}>Sign Out</div>
                    </button>
                </div>

                
                <div className={styles.bottom}>
                    <div className={styles.itemsContainer}>
                        <button className={styles.item} onClick={() => {window.open("https://github.com/dreik", "_blank")}}>
                            <Image src="/iconGitHub.svg" alt="GitHub" width={24} height={24} />
                            <div className={styles.item_title}>Project on GitHub</div>
                        </button>
                    </div>

                    <hr className={styles.separator} />

                    <div className={styles.itemsContainer}>
                        <button className={styles.item} onClick={() => {window.open("https://github.com/dreik/frontend/issues/new", "_blank")}}>
                            <Image src="/iconBug.svg" alt="Bug" width={24} height={24} />
                            <div className={styles.item_title}>Report a Bug</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;