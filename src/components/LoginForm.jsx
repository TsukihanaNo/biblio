import { useState } from "react"
import {PropTypes} from "prop-types"

async function loginUser(credentials) {
    return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    }

function LoginForm({setToken}){
    const [username, setUsername] = useState();
    const [password,setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
        username,
        password
        });
        setToken(token);
    }

    return (
        <div className="d-flex align-items-center py-4">
            <div className="form-signin w-100 m-auto">
            <h1><em>Biblio</em></h1>
            <h2>Please Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="form-label">Username</label>
                    <input id="username" className="form-control" type="text" onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password" className="form-label">Password</label>
                    <input id="password"className="form-control" type="password" onChange={e=>setPassword(e.target.value)}/>
                <div>
                    <button className="btn btn-primary m-3" type="submit">Sign in</button>
                </div>
            </form>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    setToken :PropTypes.func.isRequired
};

export default LoginForm