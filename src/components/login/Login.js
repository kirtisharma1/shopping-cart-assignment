import React from 'react';
import './login.scss';

export default function Login(props) {
    let pageType = props.page || 'registration';
    let title = pageType.toLowerCase() === 'login' ? 'Login' : 'Signup';
    let message = pageType.toLowerCase() === 'login' ?
        'Get access to your Orders. Wishlist and Recommendations' :
        'We do not share your personal details with anyone';
    return (
        <>
            <section className="section-login section-main clearfix">
                {/* <div className="row "> */}
                <div className="left-col-login" aria-label="Login text" tabIndex="0">
                    <h1 tabIndex="0">{title}</h1>
                    <p tabIndex="0">{message}</p>
                </div>
                <div className="right-col-login">
                    <form method="POST" action="/login" aria-label="Login/Registration Form">
                        {pageType !== 'login' && <InputComponent type='text' placeholder="First Name" />}
                        {pageType !== 'login' && <InputComponent type='text' placeholder="Last Name" />}
                        <InputComponent type='email' placeholder="Email" />
                        <InputComponent type='password' placeholder="Password" />
                        {pageType !== 'login' && <InputComponent type='password' placeholder="Confirm Password" />}
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
            <input type={props.type} aria-label={props.placeholder || ''} placeholder={props.placeholder || ''} id={props.type} required className={props.className || ''} value={props.value || ''}/>
        </div>
    )
}