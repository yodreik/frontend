"use client";

import { useState } from "react";
import Login from "@/components/login/login";
import Register from "@/components/register/register";

import Button from "@/components/button/button";
import styles from "./page.module.css";

const AuthPage = () => {
  const [isSingIn, setIsSignIn] = useState<boolean>(true);

  const handleSignUpClick = () => {
    setIsSignIn(false);
  };

  const handleSignInClick = () => {
    setIsSignIn(true);
  };

  return (
    <div className={styles.screen}>
      <article className={styles.container}>
        <div className={styles.block}>
          <section className={styles.block_item}>
            <h2 className={styles.block_item__title}>
              Already have an account?
            </h2>
            <Button
              label="Sign in"
              onClick={handleSignInClick}
              disabled={false}
            />
          </section>
          <section className={styles.block_item}>
            <h2 className={styles.block_item__title}>Don't have an account?</h2>
            <Button
              label="Sign up"
              onClick={handleSignUpClick}
              disabled={false}
            />
          </section>
        </div>

        <div className={`${styles.form_box} ${isSingIn ? "" : styles.active}`}>
          <Login />

          <Register />
        </div>
      </article>
    </div>
  );
};

export default AuthPage;
