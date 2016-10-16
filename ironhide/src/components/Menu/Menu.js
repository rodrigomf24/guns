import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from './../../actions/menu';
import { browserHistory } from 'react-router';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import logo from './../../images/blaster.svg';
import './Menu.css';

const titleStyle = {color:'#fff'};

function Menu({ user, menu, toggleMenu }) {
  return (
    <div>
        <Navbar bsStyle={'inverse'} fixedTop={true}>
            <Navbar.Header>
                <Navbar.Brand>
                    <a onClick={() => toggleMenu(!menu.opened) }>
                        <i className="material-icons">{(menu.opened) ? 'close' : 'menu'}</i>
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav className="pull-right">
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavDropdown pullRight eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
        <div className={ 'side-menu ' + ((menu.opened) ? 'opened' : 'closed')}>

        </div>
    </div>
  );
}

export default connect(
    state => ({
        user:state.session.user,
        menu:state.menu
    }),
    { toggleMenu }
)(Menu)