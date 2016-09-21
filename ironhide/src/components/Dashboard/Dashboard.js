import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const titleStyle = {color:'#fff'};

function Dashboard({ user }) {
  return (
    <div style={titleStyle}>
      <h1> Welcome! {user.username}</h1>
      <a onClick={ () => browserHistory.push('/') }>Go to Landing</a>
    </div>
  )
}

export default connect(
    state => ({
        user:state.session.user
    }),
    {}
)(Dashboard)