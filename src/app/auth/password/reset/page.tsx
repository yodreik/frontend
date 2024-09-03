"use client"

import { ChangeEvent, useEffect, useState } from "react";
import Form from "@/components/form/form";
import Input from "@/components/input/input";
import Button from "@/components/button/button"
import styles from "./page.module.css";

const resetPasswordPage = () => {
    const [password, setPassword] = useState<string>("");
    const [retypedPassword, setRetypedPassword] = useState<string>("");

    const [passwordStatus, setPasswordStatus] = useState<"error" | "default">("default");
    const [retypedPasswordStatus, setRetypedPasswordStatus] = useState<"error" | "default">("default");

    const [info, setInfo] = useState<string>("No info");
    const [infoStatus, setInfoStatus] = useState<"error" | "success" | "default">("default");
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

	const currentUrl: string = window.location.href;
	const url: URL = new URL(currentUrl);
	const token: string | null = url.searchParams.get("token");

    const endpoint = "http://localhost:6969/api/auth/password/update";

    const handleResetPassword = async () => {
		const res = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password, token }),
    	});

		if (res.ok) {
			displayMessage("Password successfully reseted", true);
		} 
		else {
			handleError(res.status);
		}
 	};

    const handleError = (status: number) => {
		switch (status) {
			case 404:
				displayMessage("User not found");
				break;
			case 500:
				displayMessage("Server error. Try later");
				break;
			default:
				displayMessage("An unknown error occurred");
		}
  	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		if (input.length < 8) {
			setPasswordStatus("error");
			displayMessage("Password is too short");
		} 
		else if (input.length > 50) {
			setPasswordStatus("error");
			displayMessage("Password is too long");
		} 
		else if (input !== retypedPassword && retypedPassword !== "") {
			setPasswordStatus("error");
			setRetypedPasswordStatus("error");
			displayMessage("Passwords don't match");
		} 
		else {
			setPasswordStatus("default");
			setRetypedPasswordStatus("default");
			hideMessage();
		}

		setPassword(input);
  	};

	const onChangeRetypedPassword = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		if (input !== password) {
			setPasswordStatus("error");
			setRetypedPasswordStatus("error");
			displayMessage("Passwords don't match");
		} 
		else {
			if (input.length > 7 && input.length < 51) setPasswordStatus("default");
			setRetypedPasswordStatus("default");
			hideMessage();
		}

		setRetypedPassword(input);
  	};

    useEffect(() => {
		if (passwordStatus === "error" || password === "" ||
			retypedPasswordStatus === "error" || retypedPassword === "" 
		) {
			setButtonIsDisabled(true);
		} 
		else {
			setButtonIsDisabled(false);
		}
  	}, [password, retypedPassword]);

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
                <Form className={styles.form} title="New password" info={info} infoStatus={infoStatus}>
                    <Input 
                        value={password} 
                        onChange={onChangePassword} 
                        type="password" 
                        status={passwordStatus} 
                        placeholder="Password"
                    />
					<Input 
                        value={retypedPassword} 
                        onChange={onChangeRetypedPassword} 
                        type="password" 
                        status={retypedPasswordStatus} 
                        placeholder="Retype password"
                    />

                    <Button
                        label="Reset"
                        onClick={handleResetPassword}
                        disabled={buttonIsDisabled}
                    />
                </Form>
            </div>
        </div>
    );
}

export default resetPasswordPage;