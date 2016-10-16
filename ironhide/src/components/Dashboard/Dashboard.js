import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Menu from './../Menu/Menu';
import { Container,Row,Col } from 'reactstrap';

const titleStyle = {color:'#fff'};

function Dashboard({ user }) {
  return (
    <div>
        <Menu/>
        <Row>
            <Col>
                <h1> Welcome! {user.username}</h1>
            </Col>
        </Row>
    </div>
  );
}

export default connect(
    state => ({
        user:state.session.user
    }),
    {}
)(Dashboard)