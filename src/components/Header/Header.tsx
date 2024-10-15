"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SideMenu from "@/components/SideMenu/SideMenu"
import Button from "@/components/Button/Button";
import Avatar from "@/components/Avatar/Avatar";
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
        id: userdata?.id,
        username: userdata?.username,
        email: userdata?.email,
        avatarURL: userdata?.avatar_url,
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.inner}>
                    <div className={styles.logo} onClick={() => router.push("/")}>dreik</div>
                    {
                        !(isLoading || pathname === "/auth") ? <>
                            <div className={isAuthorized ? styles.buttonsAuthorized : styles.buttons}>
                                {
                                    isAuthorized ? <>
                                        <Button
                                            label="Dashboard"
                                            onClick={() => router.push("/dashboard")}
                                            disabled={false}
                                        />
                                        <div className={styles.userInfo} onClick={() => setIsSideMenuActive(true)}>
                                            <div className={styles.name}>
                                                {user.username}
                                            </div>
                                            
                                            <div className={styles.avatarButton}>
                                                <Avatar className={styles.avatar} height={45} width={45}/>
                                            </div>
                                        </div>

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
