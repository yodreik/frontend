'use client';

import { useState } from "react";
import Login from "@/components/login/login";
import Register from "@/components/register/register";

import Button from '@/components/button/button';
import styles from './page.module.css';

const AuthPage = () => {
  const [isSingIn, setIsSignIn] = useState<boolean>(true);

  const handleSignUpClick = () => {
    setIsSignIn(false);
  }

  const handleSignInClick = () => {
    setIsSignIn(true);
  }

  return (
    <article className={styles.container}>
      <div className={styles.block}>
        <section className={styles.block_item}>
          <h2 className={styles.block_item__title}>Already have an account?</h2>
          <Button onClick={handleSignInClick} disabled={false} text='Sign in'/>
        </section>
        <section className={styles.block_item}>
          <h2 className={styles.block_item__title}>Don't have an account?</h2>
          <Button onClick={handleSignUpClick} disabled={false} text='Sign up'/>
        </section>
      </div>

      <div className={`${styles.form_box} ${isSingIn ? '' : styles.active}`}>
        
        <Login />

        <Register />

      </div>
    </article>
  );
};

export default AuthPage;