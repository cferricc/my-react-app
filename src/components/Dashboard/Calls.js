import React from 'react';
import { useState , useEffect} from 'react'
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
const user = JSON.parse(token)

    
const ShowAllTFCs = () => {

    const [tfcs, setTfcs] = useState([])
     
    useEffect( () => { 
        const token = localStorage.getItem('token');
        const user = JSON.parse(token)
        fetch('http://ELB-TFC-1697556660.us-east-1.elb.amazonaws.com/category', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + user.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setTfcs(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    console.log("tfcs" + tfcs)
    if (tfcs) {
        return (
            <div>
                {tfcs.map((tfc) => {
                  return (
                    <div key={tfc.id}>
                        <Link
                            to={`/tfc/${tfc.name}`}
                            key={tfc.id}
                            state={{ id:tfc.id }}
                        >
                        {tfc.name}
                        </Link>
                    </div>
                  );
                })}
            </div>
        )
    }
}

const CreateTFC = (name) => {
    console.log("CreateTFC")
    return fetch('http://ELB-TFC-1697556660.us-east-1.elb.amazonaws.com/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify(name)
    })
        .then(data => data.json())
}

export {ShowAllTFCs , CreateTFC}