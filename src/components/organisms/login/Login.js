import React, { useState } from 'react';
import { LOGIN } from '../../../constants';
import Input from '../../atoms/input/Input';
import * as const_login from '../../../constants/login';
import './login.scss';

export default function Login(props) {
    let pageType = props.page || 'registration';
    let title = pageType.toLowerCase() === 'login' ? const_login.LOGIN_LABEL : const_login.SIGNUP_LABEL;
    let message = pageType.toLowerCase() === 'login' ? const_login.LOGIN_MESSAGE : const_login.SIGNUP_MESSAGE;

    const regexPassword = '/^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s)|(?=.*[\d])(?=.*[A-Z])|(?=.*[\d])(?=.*[a-z]))(?!.*\s).{6,30}$/g';

    const [data, setData] = useState({});

    const validateFields = (callback) => {
        if(data.password === data.confirmPassword || pageType.toLowerCase() === 'login'){
            callback()
        }
    }   

    const onSubmit = (e) => {
        console.log('hello', data);
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
                if(res){
                    console.log('logged in successfully');
                }
            });
        });
    }

    const onChange = (e) => {
        console.log('onchange', e.target.name, e.target.value, data);
        const newData = Object.assign({}, data, {
            [e.target.name] : e.target.value
        });

        setData(newData);
        console.log('data', data);
    }

    

    return (
        <>
            <section className="login section-main clearfix">
                <div className="login__left-col" aria-label={const_login.LOGIN_TEXT_ARIA_LABEL} tabIndex="0">
                    <h1 tabIndex="0">{title}</h1>
                    <p tabIndex="0">{message}</p>
                </div>
                <div className="login__right-col">
                    <form method="POST" action="/login" aria-label={const_login.LOGIN_FORM_ARIA_LABEL} onSubmit={onSubmit}> 
                        {pageType !== 'login' && <Input type='text' placeholder={const_login.FIRST_NAME} onChange={onChange} name="firstName"/>}
                        {pageType !== 'login' && <Input type='text' placeholder={const_login.LAST_NAME} onChange={onChange} name="lastName"/>}
                        <Input type='email' placeholder={const_login.EMAIL} onChange={onChange} name="email"/>
                        <Input type='password' placeholder={const_login.PASSWORD} onChange={onChange} name="password" pattern='^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s)|(?=.*[\d])(?=.*[A-Z])|(?=.*[\d])(?=.*[a-z]))(?!.*\s).{6,30}$' title="Password must have atleast 6 characters, a number and an alphabet"/>
                        {pageType !== 'login' && <Input type='password' placeholder={const_login.CONFIRM_PASSWORD} onChange={onChange} name="confirmPassword" title="Password doesn't match"/>}
                        <Input type='submit' className='btn-full login__right-col__btn' value={title}/>
                    </form>
                </div>
            </section>
        </>
    )
}