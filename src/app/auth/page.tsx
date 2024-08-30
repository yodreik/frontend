"use client";

import { useEffect, } from 'react';
import Login from "@/components/login/login";
import Register from "@/components/register/register";
import './style.css';

const AuthPage = () => {
  useEffect(() => {
    const signInBtn = document.querySelector('.signin-btn');
    const signUpBtn = document.querySelector('.signup-btn');
    const formBox = document.querySelector('.form-box');

    const handleSignUpClick = () => {
      formBox?.classList.add('active');
    }

    const handleSignInClick = () => {
      formBox?.classList.remove('active');
    }

    signUpBtn?.addEventListener('click', handleSignUpClick);
    signInBtn?.addEventListener('click', handleSignInClick);

    return () => {
      signUpBtn?.removeEventListener('click', handleSignUpClick);
      signInBtn?.removeEventListener('click', handleSignInClick);
    }
  });

  return (
    <article className="container">
      <div className="block">
        <section className="block__item block-item">
          <h2 className="block-item__title">Already have an account?</h2>
          <button className="block-item__btn signin-btn">Sign in</button>
        </section>
        <section className="block__item block-item">
          <h2 className="block-item__title">Don't have an account?</h2>
          <button className="block-item__btn signup-btn">Sign up</button>
        </section>
      </div>

      <div className="form-box">

        <Login />

        <Register />

      </div>
    </article>
  );
};

export default AuthPage;