import './landing.css';
import logo from './../../images/blaster.svg';
import React from 'react';
import { browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavLink, Col } from 'reactstrap';


function Landing() {
  return (
    <div className="landing">
        <div className="masthead clearfix">
            <div className="inner">
                <Col xs="12" sm="2" md="2" lg="2">
                    <div className="masthead-brand">
                        <img src={logo} alt="logo"/>
                    </div>
                </Col>
                <Col xs="12" sm="10" md="10" lg="10">
                    <Navbar>
                        <Nav className="masthead-nav">
                            <NavItem>
                                <NavLink onClick={() => browserHistory.push('/login')}>
                                    <i className="material-icons d-inline-block">person</i> Login
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </Col>
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