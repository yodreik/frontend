"use client";

import Button from "@/components/button/button";
import style from "./page.module.css";
import Input from "@/components/input/input";
import { ChangeEvent, useState } from "react";

const AuthenticatePage = () => {
    const [email, setEmail] = useState<string>("sosat@chas.com");
    const [inputStatus, setInputStatus] = useState<"error" | "default">("default");

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value && !isValidEmail(value)) {
            setInputStatus("error");
        } else {
            setInputStatus("default");
        }

        setEmail(e.target.value);
    };

    const isValidEmail = (value: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }

    const handle = () => {
        const token = localStorage.removeItem('token');
    }
    return (
        <>
            <div className={style.test}>
                <h1>Authenticate</h1>
                <Button
                className={style.color}
                label="Dashboard"
                onClick={handle}
                disabled={false}
                />
                <Button
                className={style.color}
                label="Dashboard"
                onClick={() => console.log("clicked")}
                disabled={false}
                />

                <Input
                value={email}
                onChange={handleEmailChange}
                type="email"
                status={inputStatus}
                placeholder="Email"
                disabled={true}
                />

                <Input
                value={email}
                onChange={handleEmailChange}
                type="email"
                status={inputStatus}
                placeholder="Email"
                disabled={false}
                />
                <Input
                value={email}
                onChange={handleEmailChange}
                type="email"
                status={inputStatus}
                placeholder="Email"
                disabled={false}
                />
                <Input
                value={email}
                onChange={handleEmailChange}
                type="email"
                status={inputStatus}
                placeholder="Email"
                disabled={false}
                />
                <Input
                value={email}
                onChange={handleEmailChange}
                type="email"
                status={inputStatus}
                placeholder="Email"
                disabled={false}
                />
                <Button
                className={style.testb}
                label="Dashboard"
                onClick={handle}
                disabled={false}
                />
            </div>
        </>
    );
};

export default AuthenticatePage;
