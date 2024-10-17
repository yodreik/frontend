"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Api from "@/api";
import Fire from "@/icons/fire";
import Error from "@/icons/error";
import styles from "./page.module.css";


const ConfirmPage = () => {
    const [status, setStatus] = useState<"error" | "success" | "default">("default");

    const router = useRouter();

    useEffect(() => {
        const currentUrl: string = window.location.href;
	    const url: URL = new URL(currentUrl);
	    const token: string | null = url.searchParams.get("token");

        const handleConfirm = async () => {
            const result  = await Api.account.confirmRegistration({
                token: token,
            });

            if (!("message" in result)){
                setStatus("success");
                setTimeout(() => {
                    router.push("/auth");
                }, 1000);
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
                                <Fire/>
                                <div className={styles.title}>Your email successfully confirmed</div>
                            </> : <>
                                <Error/>
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