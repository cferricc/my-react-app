import React , { useState } from 'react';
import './Dashboard.css'
import { ShowAllTFCs , CreateTFC} from './Calls';

export default function Dashboard() {
  const token = localStorage.getItem('token');
  while(!token) {
    
  }

  const user = JSON.parse(token)
  const [createTFC, setCreateTFC] = useState(false)
  const [name, setName] = useState();


  if (user.email === 'root') {
    console.log("email === root")
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await CreateTFC({
        name
      });
    
      if (token.error) {
        alert(token.error)
      }
      if (token.name) {
        alert(token.name + ' added!')
      }
    }

    if (createTFC) {

      return (
        <div className='dashboard'>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Name</p>
              <input type="text" onChange={e => setName(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
                <button onClick={(() => setCreateTFC(false))}>Go back to Dashboard</button>
            </div>
          </form>
        </div>
      )
    } else {
      return(
        <div>
            <button className='Button' onClick={(() => setCreateTFC(true))}>Create new TFC</button>
            <h1>Dashboard</h1>
            <h2>Hello {user.name}!</h2>
            <h3>TFCs you are subscribed:</h3>
            {/* Add function that get users subscribed TFCs */}
            <div>All TFCs</div>
            <ShowAllTFCs/>
        </div>
      );
    }
  } else {
    return (
      <div>
      <div className='dashboard'> </div>
        <p className='nameName'>Hello, {user.name}!</p>
        <box className='flexbox'>
        <p className='nameTFC'>My TFCs:</p>
        {/* Add function that get users subscribed TFCs */}
        <p className='nameALLTFCS'>All TFCs: </p>
        <div className='background'><ShowAllTFCs/> </div>
        </box>  
        </div>
    )
  }
}