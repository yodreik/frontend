"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import "./style.css";


const AuthPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retypedPassword, setRetypedPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const endpoint = '';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // const { token } = await res.json();
        // localStorage.setItem('token', token);
        router.push('/');
      } else {
        alert('Ошибка авторизации');
      }
    } else {
      if (password == retypedPassword) {
        const endpoint = '';
        
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
        } else {
          alert('Ошибка регистрации');
        }
      } else {
        alert('Passwords don\'t match');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'retypedPassword') setRetypedPassword(value);
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
          <h2 className="block-item__title">Already have an account?</h2>
          <button onClick={() => setIsLogin(true)} className="block-item__btn signin-btn">Sign in</button>
        </section>
        <section className="block__item block-item">
          <h2 className="block-item__title">Don't have an account?</h2>
          <button onClick={() => setIsLogin(false)} className="block-item__btn signup-btn">Sign up</button>
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
              name="retypedPassword"
              value={retypedPassword}
              onChange={handleInputChange}
              placeholder="Retype password"
              required
              className='form__input'
            />
          </p>
          <p>
            <button type="submit" className="form__btn">Sign up</button>
          </p>
        </form>
      </div>
    </article>
  );
};

export default AuthPage;