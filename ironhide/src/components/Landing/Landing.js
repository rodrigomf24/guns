import './landing.css'
import logo from './../../images/blaster.svg'
import React from 'react'
import { browserHistory } from 'react-router'

function Landing() {
  return (
    <div className="landing">
        <div className="masthead clearfix">
            <div className="inner">
                <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    <div className="masthead-brand">
                        <img src={logo}/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                    <nav>
                        <ul className="nav masthead-nav">
                            <li><a onClick={() => browserHistory.push('/login')}>Login</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div className="wrapper">
            <div className="content">
                <h1>SITE TITLE</h1>
            </div>
        </div>
    </div>
  )
}

export default Landing;