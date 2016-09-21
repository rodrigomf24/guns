import './app.css';
import background from './../../images/footer_lodyas.png';
import React from 'react';

const appWrapperStyles = {
  backgroundImage: 'url(' + background + ')'
};

export default function App({ children }) {
  return (
    <div className="container-fluid no-padding">
      <div className="app-wrapper" style={appWrapperStyles}>
        {children}
      </div>
    </div>
  )
};