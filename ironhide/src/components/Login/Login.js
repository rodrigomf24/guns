import './login.css'
import logo from './../../images/blaster.svg'
import React from 'react'
import { Link, browserHistory } from 'react-router'

export default function Login({ children }) {
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
                        placeholder="Email address" required autoFocus="true" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" 
                        placeholder="Password" required/>
                </div>
                <button 
                    className="btn btn-sm btn-primary btn-block"
                    type="submit"
                    onClick={() => browserHistory.push('/dashboard')} >Login</button>
                <div className="center-block forgot-pass text-center">
                    <small><em>Forgot your password?</em></small>
                </div>
            </form>
        </div>
    </div>
  )
}