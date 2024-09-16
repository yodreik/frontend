"use client"

import { ChangeEvent, useEffect, useState } from "react";
import * as Api from "@/api";
import Form from "@/components/Form/Form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button"
import styles from "./page.module.css";

const forgotPasswordPage = () => {
    const [email, setEmail] = useState<string>("");
    const [emailStatus, setEmailStatus] = useState<"error" | "default">("default");

    const [info, setInfo] = useState<string>("No info");
    const [infoStatus, setInfoStatus] = useState<"error" | "success" | "default">("default");
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

    const handleForgotPassword = async () => {
		const result  = await Api.auth.forgotPassword({
			email: email,
		});

		if (!("message" in result)){
			displayMessage("Email with recovery link successfully sent", true);
		}
		else {
			handleError(result.status);
		}
 	};

    const handleError = (status: number) => {
		switch (status) {
			case 404:
				displayMessage("User with this email not found");
				break;
			case 500:
				displayMessage("Server error. Try later");
				break;
			default:
				displayMessage("An unknown error occurred");
		}
  	};

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		if (input.length > 254) {
			setEmailStatus("error");
			displayMessage("Email is too long");
		} 
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
			setEmailStatus("error");
			displayMessage("Invalid email");
		} 
		else {
			setEmailStatus("default");
			hideMessage();
		}

		setEmail(input);
  	};

    useEffect(() => {
		if (emailStatus === "error" || email === "") {
			setButtonIsDisabled(true);
		} 
		else {
			setButtonIsDisabled(false);
		}
  	}, [email]);

    const displayMessage = (message: string = "", isSuccess: boolean = false) => {
		if (message !== "") setInfo(message);
		if (isSuccess) setInfoStatus("success");
		else setInfoStatus("error");
	};

	const hideMessage = () => {
		setInfo("No info");
		setInfoStatus("default");
	};

    return (
        <div className={styles.screen}>
            <div className={styles.form_box}>
                <Form className={styles.form} title="Password reset" info={info} infoStatus={infoStatus}>
                    <Input 
                        value={email} 
                        onChange={onChangeEmail} 
                        type="text" 
                        status={emailStatus} 
                        placeholder="Email"
                    />

                    <Button
                        label="Request"
                        onClick={handleForgotPassword}
                        disabled={buttonIsDisabled}
                    />
                </Form>
            </div>
        </div>
    );
}

export default forgotPasswordPage;