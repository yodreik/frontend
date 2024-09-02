"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Button from "@/components/button/button";
import styles from "./register.module.css";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypedPassword, setRetypedPassword] = useState<string>("");

  const [nameStatus, setNameStatus] = useState<"default" | "error">("default");
  const [emailStatus, setEmailStatus] = useState<"default" | "error">(
    "default",
  );
  const [passwordStatus, setPasswordStatus] = useState<"default" | "error">(
    "default",
  );
  const [retypedPasswordStatus, setRetypedPasswordStatus] = useState<
    "default" | "error"
  >("default");

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [info, setInfo] = useState<string>("No info");

  const endpoint = "http://localhost:6969/api/auth/register";

  const handleRegister = async () => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      displayMessage("Successfully registered", true);
    } else {
      handleError(res.status);
    }
  };

  const handleError = (status: number) => {
    switch (status) {
      case 409:
        displayMessage("This email already taken");
        break;
      case 500:
        displayMessage("Server error. Try later");
        break;
      default:
        displayMessage("An unknown error occurred");
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length < 1) {
      setNameStatus("error");
      displayMessage("Name can't be empty");
    } else if (input.length > 50) {
      setNameStatus("error");
      displayMessage("Name is too long");
    } else {
      setNameStatus("default");
      hideMessage();
    }

    setName(input);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length > 254) {
      setEmailStatus("error");
      displayMessage("Email is too long");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      setEmailStatus("error");
      displayMessage("Invalid email");
    } else {
      setEmailStatus("default");
      hideMessage();
    }

    setEmail(input);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.length < 8) {
      setPasswordStatus("error");
      displayMessage("Password is too short");
    } else if (input.length > 50) {
      setPasswordStatus("error");
      displayMessage("Password is too long");
    } else if (input !== retypedPassword && retypedPassword !== "") {
      setPasswordStatus("error");
      setRetypedPasswordStatus("error");
      displayMessage("Passwords don't match");
    } else {
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
    } else {
      if (input.length > 7 && input.length < 51) setPasswordStatus("default");
      setRetypedPasswordStatus("default");
      hideMessage();
    }

    setRetypedPassword(input);
  };

  useEffect(() => {
    const statuses: Array<string> = [
      nameStatus,
      emailStatus,
      passwordStatus,
      retypedPasswordStatus,
    ];
    const inputs: Array<HTMLElement | null> = [
      document.getElementById("registerName"),
      document.getElementById("registerEmail"),
      document.getElementById("registerPassword"),
      document.getElementById("registerRetypedPassword"),
    ];
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i] === "error") inputs[i]?.classList.add("error-input");
      else inputs[i]?.classList.remove("error-input");
    }

    if (
      nameStatus === "error" ||
      emailStatus === "error" ||
      passwordStatus === "error" ||
      retypedPasswordStatus === "error" ||
      name === "" ||
      email === "" ||
      password === "" ||
      retypedPassword === ""
    ) {
      setButtonIsDisabled(true);
    } else {
      setButtonIsDisabled(false);
    }
  }, [nameStatus, emailStatus, passwordStatus, retypedPasswordStatus]);

  const displayMessage = (message: string = "", isSuccess: boolean = false) => {
    if (message !== "") setInfo(message);
    if (isSuccess)
      document.getElementById("registerInfo")?.classList.add("success");
    else document.getElementById("registerInfo")?.classList.add("error");
  };

  const hideMessage = () => {
    setInfo("No info");
    document
      .getElementById("registerInfo")
      ?.classList.remove("success", "error");
  };

  return (
    <form className={`${styles.form} ${styles.form_signup}`} action="#">
      <h3 className={styles.form__title}>Create your account</h3>
      <p>
        <input
          className={styles.form__input}
          type="text"
          name="name"
          id="registerName"
          value={name}
          onChange={onChangeName}
          placeholder="Name"
          required
        />
      </p>
      <p>
        <input
          className={styles.form__input}
          type="text"
          name="email"
          id="registerEmail"
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
          id="registerPassword"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
          required
        />
      </p>
      <p>
        <input
          className={styles.form__input}
          type="password"
          name="retypedPassword"
          id="registerRetypedPassword"
          value={retypedPassword}
          onChange={onChangeRetypedPassword}
          placeholder="Retype password"
          required
        />
      </p>
      <p>
        <Button
          onClick={handleRegister}
          disabled={buttonIsDisabled}
          label="Sign up"
        />
      </p>
      <small id="registerInfo" className={styles.form__info}>
        {info}
      </small>
    </form>
  );
};

export default Register;
