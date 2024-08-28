"use client";

import { useEffect, useState, ChangeEvent, FormEvent, } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';


const AuthPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retypedPassword, setRetypedPassword] = useState<string>('');
  const [error, setError] = useState<string>('No error');
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
        router.push('/');
      } else if (res.status == 404) {
        setError('Email or password are incorrect'); // '404 - Email or password are not incorrect 500 - server'
      } else if (res.status == 500) {
        setError('Server error. Try later')
      }
    } else {
      if (name.length < 1){
        setError('Name can\'t be empty')
      }
      else if (name.length > 50){
        setError('Name is too long')
      }
      else if (password.length < 8){
        setError('Password is too short')
      }
      else if (password.length > 50){
        setError('Password is too long')
      }
      else if (!/^[A-Z]{3}-\d{4}$/.test(email)){
        setError('Invalid email')
      } 
      else if (password !== retypedPassword) {
        setError('Passwords don\'t match');
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
          alert('Вы успешно зарегистрировались');
          router.push('/auth');
        } else if (res.status == 409) {
          setError('This email already taken');
        } else if (res.status == 500) {
          setError('Server error. Try later')
        }
      }
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('No error');
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
    const LoginPasswordInput = document.getElementsByName('password')[0];
    const nameInput = document.getElementsByName('name')[0];
    const emailInput = document.getElementsByName('email')[1];
    const passwordInput = document.getElementsByName('password')[1];
    const retypedPasswordInput = document.getElementsByName('retypedPassword')[0];

    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');

    if (error === 'Email or password are incorrect') {
      loginEmailInput.classList.add('error-input');
      LoginPasswordInput.classList.add('error-input');
      loginError?.classList.add('error');
    } 
    else if (error === 'Name can\'t be empty' || error === 'Name is too long'){
      nameInput.classList.add('error-input');
      registerError?.classList.add('error');
    }
    else if (error === 'This email already taken' || error === 'Invalid email'){
      emailInput.classList.add('error-input');
      registerError?.classList.add('error');
    } 
    else if (error === 'Password is too short' || error === 'Password is too long'){
      passwordInput.classList.add('error-input');
      registerError?.classList.add('error');
    }
    else if (error === 'Passwords don\'t match'){
      passwordInput.classList.add('error-input');
      retypedPasswordInput.classList.add('error-input');
      registerError?.classList.add('error');
    } 
    else if (error === 'Server error. Try later'){
      loginError?.classList.add('error');
      registerError?.classList.add('error');
    } 
    else if (error === 'No error') {
      loginEmailInput.classList.remove('error-input');
      LoginPasswordInput.classList.remove('error-input');
      nameInput.classList.remove('error-input');
      emailInput.classList.remove('error-input');
      passwordInput.classList.remove('error-input');
      retypedPasswordInput.classList.remove('error-input');
      loginError?.classList.remove('error');
      registerError?.classList.remove('error');
    }
    else {
      alert(error);
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
          <small id="loginError" className="form__error">{error}</small>
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
          <small id="registerError" className="form__error">{error}</small>
          <p>
            <button type="submit" className="form__btn">Sign up</button>
          </p>
        </form>
      </div>
    </article>
  );
};

export default AuthPage;