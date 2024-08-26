"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import "./style.css"


const AuthPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true); // Переключатель между входом и регистрацией
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/register';

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
    } else {
      alert('Ошибка при авторизации или регистрации');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <article className="container">
      <Script
        src="./script.js"
        strategy="lazyOnload"
        defer
      />
      
      <div className="block">
        <section className="block__item block-item">
          <h2 className="block-item__title">Do you already have an account?</h2>
          <button className="block-item__btn signin-btn">Sign in</button>
        </section>
        <section className="block__item block-item">
          <h2 className="block-item__title">Don't you have an account?</h2>
          <button className="block-item__btn signup-btn">Sign up</button>
        </section>
      </div>

      <div className="form-box">
        <form action="#" className="form form_signin">
          <h3 className="form__titile">Login</h3>
          <p>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className='form__input'
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
              className='form__input'
            />
          </p>
          <p>
            <button className="form__btn">Sign in</button>
          </p>
          <p>
            <a href="" className="form__forgot">Forgot Password?</a>
          </p>
        </form>

        <form action="#" className="form form_signup">
          <h3 className="form__titile">Create your account</h3>
          <p>
            <input
              type="text"
              name="name"
              // value={name}
              // onChange={handleInputChange}
              placeholder="Name"
              required
              className='form__input'
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
              className='form__input'
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
              className='form__input'
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              // value={retypedPassword}
              // onChange={handleInputChange}
              placeholder="Retype password"
              required
              className='form__input'
            />
          </p>
          <p>
            <button className="form__btn">Sign up</button>
          </p>
        </form>
      </div>
      
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button> */}
    </article>
  );
};

export default AuthPage;