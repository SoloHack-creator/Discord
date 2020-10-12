import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';

function Login() {
  const signIN = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-u2013-logos-brands-logotypes-12.png"
          alt=""
        />
      </div>
      <Button variant="contained" color="primary" onClick={signIN}>
        Sign IN{' '}
      </Button>
    </div>
  );
}

export default Login;
