"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import Avatar from "@/components/Avatar/Avatar";
import Input from "@/components/Input/Input";
import Pencil from "@/icons/pencil";
import Tick from "@/icons/tick";
import Cross from "@/icons/cross";
import styles from "./page.module.css";

interface Userdata {
    id: string,
    username: string,
    display_name: string,
    email: string,
    avatar_url: string,
    created_at: string,
    is_confirmed: boolean,
    is_private: boolean
}

const SettingsPage = () => {
    const { success } = useToast();

    const [userdata, setUserdata] = useState<Userdata | null>(null);

    const [newDisplayName, setNewDisplayName] = useState<string>("");
    const [newDisplayNameStatus, setNewDisplayNameStatus] = useState<"default" | "error">("default");

    const [newUsername, setNewUsername] = useState<string>("");
    const [newUsernameStatus, setNewUsernameStatus] = useState<"default" | "error">("default");

    const [newEmail, setNewEmail] = useState<string>("");
    const [newEmailStatus, setNewEmailStatus] = useState<"default" | "error">("default");
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);

    useEffect(() => {
        const storedUserdata = localStorage.getItem("userdata");
        if (storedUserdata) {
            setUserdata(JSON.parse(storedUserdata));
        }
    }, []);

    const onChangeNewDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length < 1 || input.length > 50) {
            setNewDisplayNameStatus("error");
        }
        else {
            setNewDisplayNameStatus("default");
        }

        setNewDisplayName(input);
    };

    const onChangeNewUsername = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length < 5 || input.length > 32) {
            setNewUsernameStatus("error");
        }
        else {
            setNewUsernameStatus("default");
        }

        setNewUsername(input);
    };

    const onChangeNewEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
            setNewEmail("error");
        }
        else {
            setNewEmailStatus("default");
        }

        setNewEmail(input);
    };

    const maskEmail = (email: string) => {
        const [localPart, domain] = email.split('@');

        if (localPart.length < 5) {
            return email;
        }

        const maskedLocalPart = localPart.slice(0, 2) + '****' + localPart.slice(-2);

        return `${maskedLocalPart}@${domain}`;
    }

    return (
        <>
            {(userdata !== null) &&
                <div className={styles.container}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Settings</div>
                        <div className={styles.sectionSeparator}/>
                        
                        <div className={styles.sectionContent}>
                            <div className={styles.column}>
                                <div className={styles.sectionInputContainer}>
                                    <div className={styles.label}>Display Name</div>
                                    <Input 
                                        className={styles.input}
                                        value={newDisplayName} 
                                        onChange={onChangeNewDisplayName}
                                        type="text"
                                        status={newDisplayNameStatus}
                                        placeholder={userdata.display_name}
                                    />
                                </div>

                                <div className={styles.sectionInputContainer}>
                                    <div className={styles.label}>Username</div>
                                    <Input 
                                        className={styles.input}
                                        value={newUsername} 
                                        onChange={onChangeNewUsername}
                                        type="text"
                                        status={newUsernameStatus}
                                        placeholder={userdata.username}
                                    />
                                </div>
                                
                                <div className={styles.sectionInputContainer}>
                                    <div className={styles.label}>Email</div>
                                    {
                                        isEditingEmail ? 
                                        <Input 
                                            className={styles.input}
                                            value={newEmail} 
                                            onChange={onChangeNewEmail}
                                            type="text"
                                            status={newEmailStatus}
                                            placeholder={userdata.email}
                                        /> :
                                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "10px", height: "40px", padding: "10px"}}>
                                            <div style={{ color: "var(--dark-white)" }}>{maskEmail(userdata.email)}</div>
                                            <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => (setIsEditingEmail(true))}>
                                                <Pencil/>
                                            </div>
                                            {
                                                userdata.is_confirmed ?
                                                <div style={{ display: "flex", alignItems: "center", color: "var(--green)", marginLeft: "auto", gap: "7px" }}><Tick className={styles.tick}/>Confirmed</div> :
                                                <div style={{ display: "flex", alignItems: "center", color: "var(--red)", marginLeft: "auto", gap: "7px" }}><Cross className={styles.cross}/>Not Confirmed</div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={styles.column}>
                                <Avatar className={styles.avatar} height={190} width={190}/>
                            </div>
                        </div>
                    </div>
                


                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Privacy</div>
                        <div className={styles.sectionSeparator}/>
                    </div>
                </div>
            }
        </>
    );
}

export default SettingsPage;