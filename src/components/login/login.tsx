"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import './style.css'


const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailStatus, setEmailStatus] = useState<'default' | 'error'>('default');
  const [passwordStatus, setPasswordStatus] = useState<'default' | 'error'>('default');

  const [info, setInfo] = useState<string>('No info');
  const router = useRouter();

  const endpoint = 'http://localhost:6969/api/auth/login'

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

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

      displayMessage('Successfully logged in', true);
      router.push('/');
    } else {
      handleError(res.status);
    }
  }

  const handleError = (status: number) => {
    switch (status) {
      case 404:
        setEmailStatus('error');
        setPasswordStatus('error');
        displayMessage('Email or password is incorrect');
        break;
      case 500:
        displayMessage('Server error. Try later');
        break;
      default:
        displayMessage('An unknown error occurred');
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    setEmailStatus('default');
    setPasswordStatus('default');
    hideMessage();

    setEmail(input);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    setEmailStatus('default');
    setPasswordStatus('default');
    hideMessage();

    setPassword(input);
  };

  useEffect(() => {
    const statuses: Array<string> = [emailStatus, passwordStatus];
    const inputs: Array<HTMLElement | null> = [document.getElementById('loginEmail'), document.getElementById('loginPassword')];
    for (let i = 0; i < statuses.length; i++){
      if (statuses[i] === 'error') inputs[i]?.classList.add('error-input');
      else inputs[i]?.classList.remove('error-input');
    }
  }, [emailStatus, passwordStatus]);

  const displayMessage = (message: string = '', isSuccess: boolean = false) => {
    if (message !== '') setInfo(message);
    if (isSuccess) document.getElementById('loginInfo')?.classList.add('success');
    else document.getElementById('loginInfo')?.classList.add('error');
  };

  const hideMessage = () => {
    setInfo('No info');
    document.getElementById('loginInfo')?.classList.remove('success', 'error');
  };

  return (
    <form onSubmit={handleLogin} action="#" className="form form_signin">
      <h3 className="form__titile">Login</h3>
      <p>
        <input
          type="text"
          name="email"
          id = "loginEmail"
          value={email}
          onChange={onChangeEmail}
          placeholder="Email"
          required
          className="form__input"
        />
      </p>
      <p>
        <input
          type="password"
          name="password"
          id = "loginPassword"
          value={password}
          onChange={onChangePassword}
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
  );
};

export default Login;