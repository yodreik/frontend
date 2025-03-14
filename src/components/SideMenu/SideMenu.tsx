"use client"

import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import Avatar from "@/components/Avatar/Avatar";
import Cross from "@/icons/cross";
import Profile from "@/icons/profile";
import Dashboard from "@/icons/dashboard";
import Settings from "@/icons/settings";
import Exit from "@/icons/exit";
import Bug from "@/icons/bug";
import GitHub from "@/icons/gitHub";
import styles from "./SideMenu.module.css";

interface Props {
    isActive: boolean;
    setInactive: () => void;
    username: string;
    displayName: string;
    email: string;
    avatarURL: string;
}

const SideMenu = (props: Props) => {
    const { logout } = useAuth();

    const router = useRouter();

    const handleLogout = () => {
        props.setInactive();
        logout();
        toast.success("Logged out");
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.menu} ${props.isActive ? styles.active : ""}`}>
                <button className={styles.closeButton} onClick={props.setInactive}>
                    <Cross className={styles.close} />
                </button >

                <div className={styles.miniProfile}>
                    <Avatar className={styles.avatar} height={38} width={38} />

                    <div className={styles.userInfo}>
                        {
                            props.displayName !== "" ?
                                <div className={styles.names}>
                                    <div className={styles.displayName}>{props.displayName}</div>
                                    <div className={styles.userName}>{`(${props.username})`}</div>
                                </div>
                                :
                                <div className={styles.displayName}>{`@${props.username}`}</div>
                        }
                        <div className={styles.userEmail}>{props.email}</div>
                    </div>
                </div>

                <hr className={styles.separator} />

                <div className={styles.itemsContainer}>
                    <button className={styles.item} onClick={() => { props.setInactive(); router.push("/") }}>
                        <Profile />
                        <div className={styles.item_title}>Profile</div>
                    </button>

                    <button className={styles.item} onClick={() => { props.setInactive(); router.push("/dashboard") }}>
                        <Dashboard />
                        <div className={styles.item_title}>Dashboard</div>
                    </button>

                    <button className={styles.item} onClick={() => { props.setInactive(); router.push("/settings") }}>
                        <Settings />
                        <div className={styles.item_title}>Settings</div>
                    </button>
                </div>

                <hr className={styles.separator} />

                <div className={styles.itemsContainer}>
                    <button className={styles.item} onClick={handleLogout}>
                        <Exit />
                        <div className={styles.item_titleRed}>Sign Out</div>
                    </button>
                </div>


                <div className={styles.bottom}>
                    <div className={styles.itemsContainer}>
                        <button className={styles.item} onClick={() => { window.open("https://github.com/yodreik", "_blank") }}>
                            <GitHub />
                            <div className={styles.item_title}>Project on GitHub</div>
                        </button>
                    </div>

                    <hr className={styles.separator} />

                    <div className={styles.itemsContainer}>
                        <button className={styles.item} onClick={() => { window.open("https://github.com/yodreik/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=", "_blank") }}>
                            <Bug />
                            <div className={styles.item_title}>Report a Bug</div>
                        </button>
                    </div>
                </div>
            </div >
            <div className={`${styles.blind} ${props.isActive ? styles.active : ""}`} onClick={props.setInactive} />
        </div >
    );
}

export default SideMenu;
