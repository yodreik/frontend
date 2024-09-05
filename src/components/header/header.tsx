"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SideMenu from "../sideMenu/sideMenu"
import Button from "../button/button";
import styles from "./header.module.css";

interface User {
    id: string;
    name: string;
    avatarURL: string;
}

const Header = () => {
    const { isAuthorized, isLoading } = useAuth();

    const [isSideMenuActive, setIsSideMenuActive] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    const user: User = {
        id: "69",
        name: "Donald M. Russel",
        avatarURL: "https://img.freepik.com/free-photo/left-sideways-american-black-person_23-2148749585.jpg",
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.inner}>
                    <div className={styles.logo}>welnex</div>
                    {
                        !(isLoading || pathname === "/auth") ? <>
                            <div className={isAuthorized ? styles.buttonsAuthorized : styles.buttons}>
                                {
                                    isAuthorized ? <>
                                        <Button
                                            className={styles.dashboardButton}
                                            label="Dashboard"
                                            onClick={() => console.log("clicked dashboard")}
                                            disabled={false}
                                        />
                                        <div className={styles.name}>
                                            {user.name}
                                        </div>
                                        <button className={styles.avatarButton} onClick={() => setIsSideMenuActive(true)}>
                                            <img src={user.avatarURL} className={styles.avatar} />
                                        </button>

                                        <SideMenu isActive={!isSideMenuActive}/>
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
