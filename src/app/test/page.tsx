"use client";

import Header from "@/components/header/header";
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
  return (
    <>
      <Header />
      <div>
        <h1>Authenticate</h1>
        <Button
          className={style.color}
          label="Dashboard"
          onClick={() => console.log("clicked")}
          disabled={true}
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
      </div>
    </>
  );
};

export default AuthenticatePage;
