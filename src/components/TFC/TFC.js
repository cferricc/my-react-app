import React , {useState} from 'react';
import { Link , useParams , useLocation } from "react-router-dom";

import {ShowCategoriesFromTFC , CreateTFC } from './Calls'


export default function TFC() {
    let params = useParams();
    const [createTFC, setCreateTFC] = useState(false)
    const [name, setName] = useState();

    try {
        const location = useLocation()
        const {id} = location.state

        const token = localStorage.getItem('token');
        const user = JSON.parse(token)

        

        if (user.email === 'root') {

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
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <p>Name</p>
                                <input type="text" onChange={e => setName(e.target.value)}/>
                            </label>
                            <div>
                                <button type="submit">Submit</button>
                                <button onClick={(() => setCreateTFC(false))}>Go back to {params.tfcName}</button>
                            </div>
                        </form>
                    </div>
                )
            }
            

            return (
                <div>
                    <button onClick={(() => setCreateTFC(true))}>Create new TFC</button>
                    <h1>{params.tfcName}</h1>
                    <h2>{id}</h2>
                    <ShowCategoriesFromTFC id ={id} name = {params.tfcName}/>
                </div>
                
            );
        } else {
            return (
                <div>
                    <h1>{params.tfcName}</h1>
                    <h2>{id}</h2>
                    <ShowCategoriesFromTFC id ={id} name = {params.tfcName}/>
                </div>
                
            );
        }

        

    } catch {
        return (
            <div>
                <h1>Ops! Something went wrong :(</h1>
                <Link to={`/`}>
                Dashboard
                </Link>
            </div>
        );
    }
}
  