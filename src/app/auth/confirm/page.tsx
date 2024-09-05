"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";


const ConfirmPage = () => {
    const [status, setStatus] = useState<"error" | "success" | "default">("default");

    const router = useRouter();
    const endpoint = "http://localhost:6969/api/auth/confirm";

    useEffect(() => {
        const currentUrl: string = window.location.href;
	    const url: URL = new URL(currentUrl);
	    const token: string | null = url.searchParams.get("token");

        const handleConfirm = async () => {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    router.push("/auth");
                }, 3000);
            }
            else {
                setStatus("error");
            }
        };

        handleConfirm();
    }, []);

    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                {
                    status !== "default" && (<>
                        {
                            status === "success" ? <>
                                <Image src="/iconFire.svg" alt="Logo" width={111} height={111} />
                                <div className={styles.title}>Your email successfully confirmed</div>
                            </> : <>
                                <Image src="/iconError.svg" alt="Logo" width={111} height={111} />
                                <div className={styles.title}>Invalid confirmation link</div>
                            </>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default ConfirmPage;