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
    <div className="login">
    <div className="login_info">
      <h1>Sign In</h1>
      <form className='login_form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email Address</label>
          <input className="email_button" type="text" onChange={e => setEmail(e.target.value)}/>

          <label htmlFor='password'>Password</label>
          <input className="password_button" type="password" onChange={e => setPassword(e.target.value)}/>
        <div>
          <button className='login_button' type="submit">Log in</button>
        </div>
        </form>
        <div className='login_divider'>
        <hr /> <span>OR</span> <hr />
      </div>

        <div>
          <button className= 'signup_button'  onClick={e => setSignUp(true)}>Sign Up</button>
        </div>
    </div>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}