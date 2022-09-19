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

      <div className="login">
      <div className='login_info'>
      <h1>Sign Up</h1>
      <form className='login_form' onSubmit={handleSubmit}>

      <label htmlFor='name'>Name</label>
          <input className='email_button' type="text" onChange={e => setName(e.target.value)}/>

        <label htmlFor='email'>Email Address</label>
          <input type="text" onChange={e => setEmail(e.target.value)}/>

          <label htmlFor='password'>Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)}/>

          <div>
          <button className='login_button' type="submit">Sign Up</button>
        </div>
          </form>

        <div className='login_divider'>
        <hr /> <span>OR</span> <hr />
        </div>
        
        <div>
          <button className='signup_button' onClick={e => setLogin(true)}>Log in</button>
        </div>
    </div>
    </div>
  )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
}