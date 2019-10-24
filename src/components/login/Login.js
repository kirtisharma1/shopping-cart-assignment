import React, { useState } from 'react';
import { LOGIN } from '../../constants';
import * as const_login from '../../constants/login';
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
            <section className="section-login section-main clearfix">
                {/* <div className="row "> */}
                <div className="left-col-login" aria-label={const_login.LOGIN_TEXT_ARIA_LABEL} tabIndex="0">
                    <h1 tabIndex="0">{title}</h1>
                    <p tabIndex="0">{message}</p>
                </div>
                <div className="right-col-login">
                    <form method="POST" action="/login" aria-label={const_login.LOGIN_FORM_ARIA_LABEL} onSubmit={onSubmit}> 
                        {pageType !== 'login' && <InputComponent type='text' placeholder={const_login.FIRST_NAME} onChange={onChange} name="firstName"/>}
                        {pageType !== 'login' && <InputComponent type='text' placeholder={const_login.LAST_NAME} onChange={onChange} name="lastName"/>}
                        <InputComponent type='email' placeholder={const_login.EMAIL} onChange={onChange} name="email"/>
                        <InputComponent type='password' placeholder={const_login.PASSWORD} onChange={onChange} name="password" pattern='^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s)|(?=.*[\d])(?=.*[A-Z])|(?=.*[\d])(?=.*[a-z]))(?!.*\s).{6,30}$' title="Password must have atleast 6 characters, a number and an alphabet"/>
                        {pageType !== 'login' && <InputComponent type='password' placeholder={const_login.CONFIRM_PASSWORD} onChange={onChange} name="confirmPassword" title="Password doesn't match"/>}
                        <InputComponent type='submit' className='btn-full btn-login' value={title}/>
                    </form>
                </div>
            </section>
        </>
    )
}

function InputComponent(props) {
    return (
        <div>
            <label htmlFor={props.type}></label>
            <input type={props.type} 
                aria-label={props.placeholder || ''} 
                placeholder={props.placeholder || ''} 
                id={props.name} 
                required 
                className={props.className || ''} 
                defaultValue={props.value || ''}
                onChange={props.onChange && props.onChange}
                name={props.name || ''}
                pattern={props.pattern || '.*'}
                title={props.title && props.title}/>
        </div>
    )
}



// ^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s)|(?=.*[\d])(?=.*[A-Z])|(?=.*[\d])(?=.*[a-z]))(?!.*\s).{6,30}$