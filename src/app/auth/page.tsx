"use client";

import { useEffect, useState, ChangeEvent, FormEvent, } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';


const AuthPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retypedPassword, setRetypedPassword] = useState<string>('');
  const [info, setInfo] = useState<string>('No info');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const endpoint = 'http://localhost:6969/api/auth/login';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        setInfo('Successfully logged in');
        router.push('/');
      } else if (res.status == 404) {
        setInfo('Email or password are incorrect');
      } else if (res.status == 500) {
        setInfo('Server error. Try later')
      }
    } else {
      if (name.length < 1){
        setInfo('Name can\'t be empty')
      }
      else if (name.length > 50){
        setInfo('Name is too long')
      }
      else if (password.length < 8){
        setInfo('Password is too short')
      }
      else if (password.length > 50){
        setInfo('Password is too long')
      }
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        setInfo('Invalid email')
      } 
      else if (password !== retypedPassword) {
        setInfo('Passwords don\'t match');
      }
      else {
        const endpoint = 'http://localhost:6969/api/auth/register';
        
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
          setInfo('Successfully registered');
        } else if (res.status == 409) {
          setInfo('This email already taken');
        } else if (res.status == 500) {
          setInfo('Server error. Try later')
        }
      }
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo('No info');
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'retypedPassword') setRetypedPassword(value);
  };

  useEffect(() => {
    const signInBtn = document.querySelector('.signin-btn');
    const signUpBtn = document.querySelector('.signup-btn');
    const formBox = document.querySelector('.form-box');

    const handleSignUpClick = () => {
      formBox?.classList.add('active');
      setIsLogin(false);
    }

    const handleSignInClick = () => {
      formBox?.classList.remove('active');
      setIsLogin(true);
    }

    signUpBtn?.addEventListener('click', handleSignUpClick);
    signInBtn?.addEventListener('click', handleSignInClick);

    return () => {
      signUpBtn?.removeEventListener('click', handleSignUpClick);
      signInBtn?.removeEventListener('click', handleSignInClick);
    }
  });

  useEffect(() => {
    const loginEmailInput = document.getElementsByName('email')[0];
    const loginPasswordInput = document.getElementsByName('password')[0];
    const nameInput = document.getElementsByName('name')[0];
    const emailInput = document.getElementsByName('email')[1];
    const passwordInput = document.getElementsByName('password')[1];
    const retypedPasswordInput = document.getElementsByName('retypedPassword')[0];

    const loginInfo = document.getElementById('loginInfo');
    const registerInfo = document.getElementById('registerInfo');
    
    if (info === 'Successfully logged in') {
      loginInfo?.classList.add('success');
    }
    else if (info === 'Successfully registered') {
      registerInfo?.classList.add('success');
    }
    else if (info === 'Email or password are incorrect') {
      loginEmailInput.classList.add('error-input');
      loginPasswordInput.classList.add('error-input');
      loginInfo?.classList.add('error');
    } 
    else if (info === 'Name can\'t be empty' || info === 'Name is too long'){
      nameInput.classList.add('error-input');
      registerInfo?.classList.add('error');
    }
    else if (info === 'This email already taken' || info === 'Invalid email'){
      emailInput.classList.add('error-input');
      registerInfo?.classList.add('error');
    } 
    else if (info === 'Password is too short' || info === 'Password is too long'){
      passwordInput.classList.add('error-input');
      registerInfo?.classList.add('error');
    }
    else if (info === 'Passwords don\'t match'){
      passwordInput.classList.add('error-input');
      retypedPasswordInput.classList.add('error-input');
      registerInfo?.classList.add('error');
    } 
    else if (info === 'Server error. Try later'){
      loginInfo?.classList.add('error');
      registerInfo?.classList.add('error');
    } 
    else if (info === 'No info') {
      loginInfo?.classList.remove('success');
      registerInfo?.classList.remove('success');

      loginEmailInput.classList.remove('error-input');
      loginPasswordInput.classList.remove('error-input');
      nameInput.classList.remove('error-input');
      emailInput.classList.remove('error-input');
      passwordInput.classList.remove('error-input');
      retypedPasswordInput.classList.remove('error-input');
      loginInfo?.classList.remove('error');
      registerInfo?.classList.remove('error');
    }
    else {
      alert(info);
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
        <form onSubmit={handleSubmit} action="#" className="form form_signin">
          <h3 className="form__titile">Login</h3>
          <p>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="form__input"
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="form__input"
            />
          </p>
          <small id="loginInfo" className="form__info">{info}</small>
          <p>
            <button type="submit" className="form__btn">Sign in</button>
          </p>
          <p>
            <a href="" className="form__forgot">Forgot Password?</a>
          </p>
        </form>

        <form onSubmit={handleSubmit} action="#" className="form form_signup">
          <h3 className="form__titile">Create your account</h3>
          <p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              className="form__input"
            />
          </p>
          <p>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="form__input"
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="form__input"
            />
          </p>
          <p>
            <input
              type="password"
              name="retypedPassword"
              value={retypedPassword}
              onChange={handleInputChange}
              placeholder="Retype password"
              required
              className="form__input"
            />
          </p>
          <small id="registerInfo" className="form__info">{info}</small>
          <p>
            <button type="submit" className="form__btn">Sign up</button>
          </p>
        </form>
      </div>
    </article>
  );
};

export default AuthPage;