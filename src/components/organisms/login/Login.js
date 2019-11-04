import React, { useState } from 'react';
import { LOGIN } from '../../../constants';
import Input from '../../atoms/input/Input';
import * as constLogin from '../../../constants/login';
import './login.scss';

export default function Login(props) {
  let pageType = props.page || 'registration';
  let title = pageType.toLowerCase() === 'login' ? constLogin.LOGIN_LABEL : constLogin.SIGNUP_LABEL;
  let message = pageType.toLowerCase() === 'login' ? constLogin.LOGIN_MESSAGE : constLogin.SIGNUP_MESSAGE;

  const [data, setData] = useState({});

  const validateFields = (callback) => {
    if (data.password === data.confirmPassword || pageType.toLowerCase() === 'login') {
      callback()
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    validateFields(() => {
      fetch(LOGIN, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(res => {
          if (res) {
            console.log('logged in successfully');
          }
        });
    });
  }

  const onChange = (e) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value
    });

    setData(newData);
  }

  return (
    <>
      <section className="login section-main clearfix">
        <div className="login__left-col" aria-label={constLogin.LOGIN_TEXT_ARIA_LABEL} tabIndex="0">
          <h1 tabIndex="0">{title}</h1>
          <p tabIndex="0">{message}</p>
        </div>
        <div className="login__right-col">
          <form method="POST" action="/login" aria-label={constLogin.LOGIN_FORM_ARIA_LABEL} onSubmit={onSubmit}>
            {pageType !== 'login' && <Input type='text' placeholder={constLogin.FIRST_NAME} onChange={onChange} name="firstName" />}
            {pageType !== 'login' && <Input type='text' placeholder={constLogin.LAST_NAME} onChange={onChange} name="lastName" />}
            <Input type='email' placeholder={constLogin.EMAIL} onChange={onChange} name="email" />
            <Input type='password' placeholder={constLogin.PASSWORD} onChange={onChange} name="password" pattern='^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s)|(?=.*[\d])(?=.*[A-Z])|(?=.*[\d])(?=.*[a-z]))(?!.*\s).{6,30}$' title="Password must have atleast 6 characters, a number and an alphabet" />
            {pageType !== 'login' && <Input type='password' placeholder={constLogin.CONFIRM_PASSWORD} onChange={onChange} name="confirmPassword" title="Password doesn't match" />}
            <Input type='submit' className='btn-full login__right-col__btn' value={title} />
          </form>
        </div>
      </section>
    </>
  )
}