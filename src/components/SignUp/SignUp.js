import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Login from '../Login/Login'

async function signUpUser(credentials) {
    return fetch('http://ELB-TFC-1697556660.us-east-1.elb.amazonaws.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}
   

export default function SignUp({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const [login, setLogin] = useState(false);

  if (login) {
    return <Login setToken={setToken} />
  }
  

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await signUpUser({
      email,
      password,
      name
    });
    if (token.error) {
        alert(token.error)
    } else {
        <Login setToken={setToken} />
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Please Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setName(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <button onClick={e => setLogin(true)}>Log in</button>
        </div>
      </form>
    </div>
  )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
}