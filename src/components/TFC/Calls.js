import React from "react";
import { useState , useEffect} from 'react'
import { Link , useParams } from 'react-router-dom';


const token = localStorage.getItem('token');
const user = JSON.parse(token)

    
const ShowCategoriesFromTFC = (id) => {
    let params = useParams();
    const [tfcs, setTfcs] = useState([])
     
    useEffect( () => { 
        fetch('http://ELB-TFC-1697556660.us-east-1.elb.amazonaws.com/category/tfc', {
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
    return (
    <div>
        {tfcs.map((tfc) => {
            console.log("Category ID: " + tfc.category_id)
            console.log("ID: " + id.id)
            console.log(tfc.category_id === id.id)
            
            if(tfc.category_id === id.id){
                return (
                <div key={tfc.id}>
                    <Link
                        to={`/tfc/${params.tfcName}/${tfc.name}`}
                        key={tfc.id}
                    >
                    {tfc.name}
                    </Link>
                    <p>{tfc.desciption}</p>
                </div>)
            }
            return (
                <div key={tfc.id}>
                </div>)
        })}
    </div>
    )
}

const CreateTFC = (name) => {
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

const CreateCategory = (body) => {
    return fetch('http://ELB-TFC-1697556660.us-east-1.elb.amazonaws.com/tfc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify(body)
    })
        .then(data => data.json())
}



export {ShowCategoriesFromTFC , CreateTFC }