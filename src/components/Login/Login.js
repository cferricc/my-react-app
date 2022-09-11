import React, { useState } from 'react';
import PropTypes from 'prop-types';


import './Login.css';
import SignUp from '../SignUp/SignUp'

async function loginUser(credentials) {
    return fetch('http://ELB-TFC-1697556660.us-east-1.elb.amazonaws.com/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}
   

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [signUp, setSignUp] = useState(false);

  if (signUp) {
    return <SignUp setToken={setToken} />
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });

    if (token.error) {
        alert(token.error)
    } else {
        setToken(token);
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <button onClick={e => setSignUp(true)}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}