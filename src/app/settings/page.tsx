"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as Api from "@/api";
import { toast } from "sonner";
import Avatar from "@/components/modules/Avatar/Avatar";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Pencil from "@/icons/pencil";
import Tick from "@/icons/tick";
import Cross from "@/icons/cross";
import Bin from "@/icons/bin";
import styles from "./page.module.css";

const SettingsPage = () => {
    const { userdata, refreshUserData } = useAuth();

    const [newDisplayName, setNewDisplayName] = useState<string>(userdata.display_name);
    const [newDisplayNameStatus, setNewDisplayNameStatus] = useState<"default" | "error">("default");

    const [newUsername, setNewUsername] = useState<string>(userdata.username);
    const [newUsernameStatus, setNewUsernameStatus] = useState<"default" | "error">("default");

    const [newEmail, setNewEmail] = useState<string>(userdata.email);
    const [newEmailStatus, setNewEmailStatus] = useState<"default" | "error">("default");
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);

    const [avatar, setAvatar] = useState<File | null | undefined>(undefined);
    const [temporaryURL, setTemporaryURL] = useState<string | null | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isPrivate, setIsPrivate] = useState<boolean>(userdata.is_private);

    useEffect(() => {
        setNewDisplayName(userdata.display_name);
        setNewUsername(userdata.username);
        setNewEmail(userdata.email);
        setIsPrivate(userdata.is_private);
    }, [userdata.display_name, userdata.username, userdata.email, userdata.is_private])


    const handleSaveInfo = async () => {
        let newData = {};

        if (newDisplayName !== userdata.display_name) {
            newData = { display_name: newDisplayName };
        }
        if (newUsername !== userdata.username) {
            newData = { ...newData, username: newUsername}
        }
        if (newEmail !== userdata.email) {
            newData = { ...newData, email: newEmail}
        }
        if (isPrivate !== userdata.is_private) {
            newData = { ...newData, is_private: isPrivate}
        }

        if (Object.keys(newData).length !== 0) {
            const result = await Api.account.updateUser(newData);

            if (!("message" in result)) {
                toast.success("Success change info")
                refreshUserData();
            }
            else {
                toast.error(result.message);
            }
        }
    }

    const handleSaveAvatar = async () => {
        if (avatar) {
            const result = await Api.account.updateAvatar({ avatar: avatar });

            if (!("message" in result)) {
                toast.success("Success upload avatar")
                refreshUserData();
                setAvatar(undefined);
                setTemporaryURL(undefined);
            }
            else {
                toast.error(result.message);
            }
        }
        if (avatar === null) {
            const result = await Api.account.deleteAvatar();

            if (!("message" in result)) {
                toast.success("Success delete avatar")
                refreshUserData();
                setAvatar(undefined);
                setTemporaryURL(undefined);
            }
            else {
                toast.error(result.message);
            }
        }
    }

    const handleSaveChanges = () => {
        handleSaveInfo();
        handleSaveAvatar();
    }

    const onChangeNewDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length > 50) {
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

    const handlePencilClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const droppedFile = event.target.files?.[0];
        if (droppedFile) {
            setAvatar(droppedFile);

            const url = URL.createObjectURL(droppedFile);
            setTemporaryURL(url);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setAvatar(droppedFile);

            const url = URL.createObjectURL(droppedFile);
            setTemporaryURL(url);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const hadnleDeleteAvatar = () => {
        setAvatar(null);
        setTemporaryURL(null);
    }

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
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Settings</div>
                    <div className={styles.sectionSeparator} />

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
                                        /> :
                                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "10px", height: "40px", padding: "10px" }}>
                                            <div style={{ color: "var(--dark-white)" }}>{maskEmail(userdata.email)}</div>
                                            <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => (setIsEditingEmail(true))}>
                                                <Pencil className={styles.pencil}/>
                                            </div>
                                            {
                                                userdata.is_confirmed ?
                                                    <div style={{ display: "flex", alignItems: "center", color: "var(--green)", marginLeft: "auto", gap: "7px" }}><Tick className={styles.tick} />Confirmed</div> :
                                                    <div style={{ display: "flex", alignItems: "center", color: "var(--red)", marginLeft: "auto", gap: "7px" }}><Cross className={styles.cross} />Not Confirmed</div>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        
                        <div className={styles.column}>
                            <div className={styles.avatarContariner}>
                                <Avatar className={styles.avatar} height={190} width={190} temporaryURL={temporaryURL !== undefined ? temporaryURL : ""}/>
                                {
                                    <>
                                        <div className={styles.blind} onClick={handlePencilClick} onDrop={handleDrop} onDragOver={handleDragOver}> 
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            <Pencil className={styles.bigPencil}/>
                                        </div>
                                        
                                    </>
                                }
                                <div className={styles.deleteAvatar} onClick={hadnleDeleteAvatar}>
                                    <Bin className={styles.bin}/>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>



                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Privacy</div>
                    <div className={styles.sectionSeparator} />

                    <div className={styles.sectionContent}>
                        <div className={styles.column}>
                            <Checkbox
                                label={"Public profile"}
                                onClick={() => (setIsPrivate(!isPrivate))}
                                isChecked={isPrivate}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.saveButtonContainer}>
                        <Button
                            label="Save"
                            onClick={handleSaveChanges}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsPage;