"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SideMenu from "../SideMenu/SideMenu"
import Button from "@/components/Button/Button";
import styles from "./Header.module.css";

interface User {
    id: string;
    username: string;
    email: string;
    avatarURL: string;
}

const Header = () => {
    const { isAuthorized, isLoading, userdata } = useAuth();

    const [isSideMenuActive, setIsSideMenuActive] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    const user: User = {
        id: userdata?.id || "69",
        username: userdata?.username || "Donald M. Russel",
        email: userdata?.email || "donaldrussell@gmail.com",
        avatarURL: "https://img.freepik.com/free-photo/left-sideways-american-black-person_23-2148749585.jpg",
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.inner}>
                    <div className={styles.logo}>dreik</div>
                    {
                        !(isLoading || pathname === "/auth") ? <>
                            <div className={isAuthorized ? styles.buttonsAuthorized : styles.buttons}>
                                {
                                    isAuthorized ? <>
                                        <Button
                                            className={styles.dashboardButton}
                                            label="Dashboard"
                                            onClick={() => router.push("/dashboard")}
                                            disabled={false}
                                        />
                                        <div className={styles.name}>
                                            {user.username}
                                        </div>
                                        <button className={styles.avatarButton} onClick={() => setIsSideMenuActive(true)}>
                                            <img src={user.avatarURL} className={styles.avatar} />
                                        </button>

                                        <SideMenu 
                                            isActive={isSideMenuActive} 
                                            setInactive={() => {setIsSideMenuActive(false)}}
                                            username={user.username}
                                            email={user.email}
                                            avatarURL={user.avatarURL}
                                        />
                                    </> : <>
                                        <Button
                                            className={styles.loginButton}
                                            label="Log In"
                                            onClick={() => router.push("/auth")}
                                            disabled={false}
                                        />
                                        <Button
                                            className={styles.registerButton}
                                            label="Register"
                                            onClick={() => router.push("/auth?isRegister=true")}
                                            disabled={false}
                                        />
                                    </>
                                }
                            </div>
                        </> : <></>
                    }
                </div>
                <hr className={styles.separator} />
            </div>
        </>
    );
};

export default Header;
