"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import * as Api from "@/api";
import Form from "@/components/Form/Form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import { toast } from "sonner";


const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true);

    const [emailOrUsernameLogin, setEmailOrUsernameLogin] = useState<string>("");
    const [passwordLogin, setPasswordLogin] = useState<string>("");

    const [emailOrUsernameLoginStatus, setEmailOrUsernameLoginStatus] = useState<"default" | "error">("default");
    const [passwordLoginStatus, setPasswordLoginStatus] = useState<"default" | "error">("default");

    const [infoLogin, setInfoLogin] = useState<string>("No info");
    const [infoLoginStatus, setInfoLoginStatus] = useState<"error" | "success" | "default">("default");
    const [buttonLoginIsDisabled, setButtonLoginIsDisabled] = useState<boolean>(false);

    const [usernameRegister, setUsernameRegister] = useState<string>("");
    const [emailRegister, setEmailRegister] = useState<string>("");
    const [passwordRegister, setPasswordRegister] = useState<string>("");
    const [retypedPasswordRegister, setRetypedPasswordRegister] = useState<string>("");

    const [usernameRegisterStatus, setUsernameRegisterStatus] = useState<"default" | "error">("default");
    const [emailRegisterStatus, setEmailRegisterStatus] = useState<"default" | "error">("default");
    const [passwordRegisterStatus, setPasswordRegisterStatus] = useState<"default" | "error">("default");
    const [retypedPasswordRegisterStatus, setRetypedPasswordRegisterStatus] = useState<"default" | "error">("default");

    const [infoRegister, setInfoRegister] = useState<string>("No info");
    const [infoRegisterStatus, setInfoRegisterStatus] = useState<"error" | "success" | "default">("default");
    const [buttonRegisterIsDisabled, setButtonRegisterIsDisabled] = useState<boolean>(false);

    const { setIsAuthorized } = useAuth();

    const router = useRouter();

    useEffect(() => {
        const currentUrl: string = window.location.href;
        const url: URL = new URL(currentUrl);
        const isRegister: string | null = url.searchParams.get("isRegister");
        if (isRegister === "true") {
            setIsSignIn(false);
        }
    }, []);

    const handleLogin = async () => {
        const result = await Api.auth.login({
            login: emailOrUsernameLogin,
            password: passwordLogin,
        });

        if (!("message" in result)) {
            Cookies.set("token", result.token, { expires: 365 });
            setIsAuthorized(true);

            router.push("/dashboard");
            toast.success("Successfully logged in!")
        }
        else {
            handleLoginError(result.status);
        }
    };

    const handleLoginError = (status: number) => {
        switch (status) {
            case 401:
                toast.error("Incorrect login or password");
                break;
            case 403:
                toast.info("Confirm your email");
                break;
            case 500:
                toast.error("Something went wrong. Try again later");
                break;
            default:
                toast.error("Unknown error occurred")
        }
    };

    const handleRegister = async () => {
        const result = await Api.auth.register({
            username: usernameRegister,
            email: emailRegister,
            password: passwordRegister,
        });

        if (!("message" in result)) {
            toast.success("Registered successfully. Check your email to verify account")
        }
        else {
            handleRegisterError(result.status);
        }
    };

    const handleRegisterError = (status: number) => {
        switch (status) {
            case 409:
                toast.error("This email or username already taken")
                break;
            case 500:
                toast.error("Something went wrong. Try again later")
                break;
            default:
                toast.error("An unknown error occurred");
        }
    };

    const onChangeEmailOrUsernameLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length > 254 || input.length < 5) {
            setEmailOrUsernameLoginStatus("error");
            displayLoginMessage("Email or username should be from 5 to 254 characters long");
        }
        else {
            setEmailOrUsernameLoginStatus("default");
            hideLoginMessage();
        }

        setEmailOrUsernameLogin(input);
    };

    const onChangePasswordLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length < 8) {
            setPasswordLoginStatus("error");
            displayLoginMessage("Password is too short");
        }
        else if (input.length > 50) {
            setPasswordLoginStatus("error");
            displayLoginMessage("Password is too long");
        }
        else {
            setPasswordLoginStatus("default");
            hideLoginMessage();
        }

        setPasswordLogin(input);
    };

    const onChangeUsernameRegister = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length < 5) {
            setUsernameRegisterStatus("error");
            displayRegisterMessage("Username is too short");
        }
        else if (input.length > 32) {
            setUsernameRegisterStatus("error");
            displayRegisterMessage("Username is too long");
        }
        else {
            setUsernameRegisterStatus("default");
            hideRegisterMessage();
        }

        setUsernameRegister(input);
    };

    const onChangeEmailRegister = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length > 254) {
            setEmailRegisterStatus("error");
            displayRegisterMessage("Email is too long");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
            setEmailRegisterStatus("error");
            displayRegisterMessage("Invalid email");
        }
        else {
            setEmailRegisterStatus("default");
            hideRegisterMessage();
        }

        setEmailRegister(input);
    };

    const onChangePasswordRegister = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input.length < 8) {
            setPasswordRegisterStatus("error");
            displayRegisterMessage("Password is too short");
        }
        else if (input.length > 50) {
            setPasswordRegisterStatus("error");
            displayRegisterMessage("Password is too long");
        }
        else if (input !== retypedPasswordRegister && retypedPasswordRegister !== "") {
            setPasswordRegisterStatus("error");
            setRetypedPasswordRegisterStatus("error");
            displayRegisterMessage("Passwords don't match");
        }
        else {
            setPasswordRegisterStatus("default");
            setRetypedPasswordRegisterStatus("default");
            hideRegisterMessage();
        }

        setPasswordRegister(input);
    };

    const onChangeRetypedPasswordRegister = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (input !== passwordRegister) {
            setPasswordRegisterStatus("error");
            setRetypedPasswordRegisterStatus("error");
            displayRegisterMessage("Passwords don't match");
        }
        else {
            if (input.length > 7 && input.length < 51) setPasswordRegisterStatus("default");
            setRetypedPasswordRegisterStatus("default");
            hideRegisterMessage();
        }

        setRetypedPasswordRegister(input);
    };

    useEffect(() => {
        if (
            emailOrUsernameLoginStatus === "error" ||
            passwordLoginStatus === "error" ||
            emailOrUsernameLogin === "" ||
            passwordLogin === ""
        ) {
            setButtonLoginIsDisabled(true);
        }
        else {
            setButtonLoginIsDisabled(false);
        }
    }, [emailOrUsernameLogin, passwordLogin]);

    useEffect(() => {
        if (
            usernameRegisterStatus === "error" ||
            emailRegisterStatus === "error" ||
            passwordRegisterStatus === "error" ||
            retypedPasswordRegisterStatus === "error" ||
            usernameRegister === "" ||
            emailRegister === "" ||
            passwordRegister === "" ||
            retypedPasswordRegister === ""
        ) {
            setButtonRegisterIsDisabled(true);
        }
        else {
            setButtonRegisterIsDisabled(false);
        }
    }, [usernameRegister, emailRegister, passwordRegister, retypedPasswordRegister]);

    const displayLoginMessage = (message: string = "", isSuccess: boolean = false) => {
        if (message !== "") setInfoLogin(message);
        if (isSuccess) setInfoLoginStatus("success");
        else setInfoLoginStatus("error");
    };

    const hideLoginMessage = () => {
        setInfoLogin("No info");
        setInfoLoginStatus("default");
    };

    const displayRegisterMessage = (message: string = "", isSuccess: boolean = false) => {
        if (message !== "") setInfoRegister(message);
        if (isSuccess) setInfoRegisterStatus("success");
        else setInfoRegisterStatus("error");
    };

    const hideRegisterMessage = () => {
        setInfoRegister("No info");
        setInfoRegisterStatus("default");
    };

    return (
        <article className={styles.container}>
            <div className={styles.block}>
                <section className={styles.block_item}>
                    <h2 className={styles.block_item__title}>
                        Already have an account?
                    </h2>
                    <Button
                        label="Log In"
                        onClick={() => (setIsSignIn(true))}
                        disabled={false}
                    />
                </section>
                <section className={styles.block_item}>
                    <h2 className={styles.block_item__title}>{"Don't have an account?"}</h2>
                    <Button
                        label="Create"
                        onClick={() => (setIsSignIn(false))}
                        disabled={false}
                    />
                </section>
            </div>

            <div className={`${styles.form_box} ${isSignIn ? "" : styles.active}`}>
                <Form className={styles.form_signin} title="Log In" info={infoLogin} infoStatus={infoLoginStatus}>
                    <Input
                        value={emailOrUsernameLogin}
                        onChange={onChangeEmailOrUsernameLogin}
                        type="text"
                        status={emailOrUsernameLoginStatus}
                        placeholder="Email or username"
                    />
                    <Input
                        value={passwordLogin}
                        onChange={onChangePasswordLogin}
                        type="password"
                        status={passwordLoginStatus}
                        placeholder="Password"
                    />

                    <Button
                        label="Sign In"
                        onClick={handleLogin}
                        disabled={buttonLoginIsDisabled}
                    />
                    <p>
                        <a href="/auth/password/forgot" className={styles.form__forgot}>
                            Forgot Password?
                        </a>
                    </p>
                </Form>

                <Form className={styles.form_signup} title="Create an account" info={infoRegister} infoStatus={infoRegisterStatus}>
                    <Input
                        value={usernameRegister}
                        onChange={onChangeUsernameRegister}
                        type="text"
                        status={usernameRegisterStatus}
                        placeholder="Username"
                    />
                    <Input
                        value={emailRegister}
                        onChange={onChangeEmailRegister}
                        type="text"
                        status={emailRegisterStatus}
                        placeholder="Email"
                    />
                    <Input
                        value={passwordRegister}
                        onChange={onChangePasswordRegister}
                        type="password"
                        status={passwordRegisterStatus}
                        placeholder="Password"
                    />
                    <Input
                        value={retypedPasswordRegister}
                        onChange={onChangeRetypedPasswordRegister}
                        type="password"
                        status={retypedPasswordRegisterStatus}
                        placeholder="Retype password"
                    />

                    <Button
                        label="Create"
                        onClick={handleRegister}
                        disabled={buttonRegisterIsDisabled}
                    />
                </Form>
            </div>
        </article>
    );
};

export default AuthPage;
