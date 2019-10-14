import React from 'react';
import './login.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let pageType = this.props.page || 'registration';
        let title = pageType.toLowerCase() === 'login' ? 'Login' : 'Signup';
        let message = pageType.toLowerCase() === 'login' ?
            'Get access to your Orders. Wishlist and Recommendations' :
            'We do not share your personal details with anyone';
        return (
            <React.Fragment>
                <section className="section-login section-main clearfix">
                    {/* <div className="row "> */}
                    <div className="left-col-login">
                        <h2>{title}</h2>
                        <p>{message}</p>
                    </div>
                    <div className="right-col-login">
                        <form method="POST" action="/login">
                            {pageType !== 'login' && <InputComponent type='text' placeholder="First Name" />}
                            {pageType !== 'login' && <InputComponent type='text' placeholder="Last Name" />}
                            <InputComponent type='email' placeholder="Email" />
                            <InputComponent type='password' placeholder="Password" />
                            {pageType !== 'login' && <InputComponent type='password' placeholder="Confirm Password" />}
                            <InputComponent type='submit' className='btn-full btn-login' value={title}/>
                        </form>
                    </div>
                </section>
            </React.Fragment>
        )
    }

    // submitLogin = () => {

    // }
}

function InputComponent(props) {
    return (
        <div>
            <input type={props.type} placeholder={props.placeholder || ''} required className={props.className || ''} value={props.value || ''}/>
        </div>
    )
}