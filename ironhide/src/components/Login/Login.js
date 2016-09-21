import './login.css';
import logo from './../../images/blaster.svg';
import React from 'react';
import { Button, Input, Label, FormGroup } from 'reactstrap';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import Api from './../../services/SutorejiApi';
import { setEmail, setPassword } from './../../actions/login';
import { login } from './../../actions/session';

import { Row, Col } from 'reactstrap';

const loginUser = function(email, password, login) {
    Api.user.login(email, password).then(function(credentials) {
        login(credentials.id, credentials.userId);
        console.log(credentials);
        if(typeof(credentials) === 'object' && credentials.id) {
            browserHistory.push('/dashboard');
        }
    }, function(err) {
        // raise error notification
    });
};

function Login({ email, password, authToken, loginStatus, userId, setEmail, setPassword, login }) {
    return (
        <Row className="full-height">
            <div className="flex-container">
                <div className="form-signin flex-child">
                    <div className="form-signin-heading">
                        <img src={logo}/>
                    </div>
                    <FormGroup>
                        <Label for="inputEmail" className="sr-only">Email address</Label>
                        <Input type="email" id="inputEmail" className="form-control"
                            placeholder="Email address" required autoFocus="true"
                            onChange={ (e) => setEmail(e.target.value) } />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPassword" className="sr-only">Password</Label>
                        <Input type="password" id="inputPassword" className="form-control"
                            placeholder="Password" required
                            onChange={ (e) => setPassword(e.target.value) } />
                    </FormGroup>
                    <Button
                        outline
                        size="md"
                        color="info"
                        block
                        onClick={() => loginUser(email, password, login) } >Login</Button>
                    <div className="center-block forgot-pass text-center">
                        <small><em>Forgot your password?</em></small>
                    </div>
                </div>
            </div>
        </Row>
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