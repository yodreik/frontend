"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/button";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailStatus, setEmailStatus] = useState<"default" | "error">(
    "default",
  );
  const [passwordStatus, setPasswordStatus] = useState<"default" | "error">(
    "default",
  );

  const [info, setInfo] = useState<string>("No info");
  const router = useRouter();

  const endpoint = "http://localhost:6969/api/auth/login";

  const handleLogin = async () => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);

      displayMessage("Successfully logged in", true);
      router.push("/");
    } else {
      handleError(res.status);
    }
  };

  const handleError = (status: number) => {
    switch (status) {
      case 404:
        setEmailStatus("error");
        setPasswordStatus("error");
        displayMessage("Email or password is incorrect");
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

    setEmailStatus("default");
    setPasswordStatus("default");
    hideMessage();

    setEmail(input);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setEmailStatus("default");
    setPasswordStatus("default");
    hideMessage();

    setPassword(input);
  };

  useEffect(() => {
    const statuses: Array<string> = [emailStatus, passwordStatus];
    const inputs: Array<HTMLElement | null> = [
      document.getElementById("loginEmail"),
      document.getElementById("loginPassword"),
    ];
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i] === "error") inputs[i]?.classList.add("error-input");
      else inputs[i]?.classList.remove("error-input");
    }
  }, [emailStatus, passwordStatus]);

  const displayMessage = (message: string = "", isSuccess: boolean = false) => {
    if (message !== "") setInfo(message);
    if (isSuccess)
      document.getElementById("loginInfo")?.classList.add("success");
    else document.getElementById("loginInfo")?.classList.add("error");
  };

  const hideMessage = () => {
    setInfo("No info");
    document.getElementById("loginInfo")?.classList.remove("success", "error");
  };

  return (
    <form className={`${styles.form} ${styles.form_signin}`} action="#">
      <h3 className={styles.form__titile}>Login</h3>
      <p>
        <input
          className={styles.form__input}
          type="text"
          name="email"
          id="loginEmail"
          value={email}
          onChange={onChangeEmail}
          placeholder="Email"
          required
        />
      </p>
      <p>
        <input
          className={styles.form__input}
          type="password"
          name="password"
          id="loginPassword"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
          required
        />
      </p>
      <p>
        <Button onClick={handleLogin} disabled={false} label="Sign in" />
      </p>
      <p>
        <a href="" className={styles.form__forgot}>
          Forgot Password?
        </a>
      </p>
      <div>
        <small id="loginInfo" className={styles.form__info}>
          {info}
        </small>
      </div>
    </form>
  );
};

export default Login;
