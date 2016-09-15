import './login.css';
import logo from './../../images/blaster.svg';
import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import Api from './../../services/SutorejiApi';
import { setEmail, setPassword } from './../../actions/login';
import { login } from './../../actions/session';

const loginUser = function(email, password, login) {
    Api.user.login(email, password).then(function(credentials) {
        login(credentials.id, credentials.userId);
        browserHistory.push('/dashboard');
    }, function(err) {
        // raise error notification
    });
};

function Login({ email, password, authToken, loginStatus, userId, setEmail, setPassword, login }) {
    return (
        <div className="row full-height">
            <div className="flex-container">
                <form className="form-signin flex-child">
                    <div className="form-signin-heading">
                        <img src={logo}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control"
                            placeholder="Email address" required autoFocus="true"
                            onChange={ (e) => setEmail(e.target.value) } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" 
                            placeholder="Password" required
                            onChange={ (e) => setPassword(e.target.value) } />
                    </div>
                    <button 
                        className="btn btn-sm btn-primary btn-block"
                        type="button"
                        onClick={() => loginUser(email, password, login) } >Login</button>
                    <div className="center-block forgot-pass text-center">
                        <small><em>Forgot your password?</em></small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default connect(
    state => ({ 
        email: state.login.email,
        password: state.login.password,
        authToken:state.session.authToken,
        loginStatus: state.session.loginStatus,
        userId: state.session.userId
    }),
    { setEmail, setPassword, login }
)(Login)