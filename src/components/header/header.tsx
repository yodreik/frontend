"use client";

import Button from "../button/button";
import styles from "./header.module.css";

interface User {
    id: string;
    name: string;
    avatarURL: string;
}

const Header = () => {
    const user: User = {
        id: "69",
        name: "Donald M. Russel",
        avatarURL: "https://img.freepik.com/free-photo/left-sideways-american-black-person_23-2148749585.jpg",
    }

    const isAuthorized = true;

    return (
        <>
            <div className={styles.header}>
                <div className={styles.inner}>
                    <div className={styles.logo}>welnex</div>
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
                                <img src={user.avatarURL} className={styles.avatar} />
                            </> : <>
                                <Button
                                    className={styles.loginButton}
                                    label="Log In"
                                    onClick={() => console.log("clicked log in")}
                                    disabled={false}
                                />
                                <Button
                                    className={styles.registerButton}
                                    label="Register"
                                    onClick={() => console.log("clicked register")}
                                    disabled={false}
                                />
                            </>
                        }
                    </div>
                </div>
                <hr className={styles.separator} />
            </div>
        </>
    );
};

export default Header;
