import axios from 'axios';
import Navbar from "../components/Navbar";
import { TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { setLoggedIn } from "..";

function Login() {
    const url = 'http://localhost:3000/login';
    const navigate = useNavigate();
    const { state } = useLocation();
    const { from } = state || { from: '/' };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            user: {
                username: username, 
                password: password
            }
        };

        axios.post(url, user)
            .then(response => {
                console.log(response);
                if (response.headers.authorization) {
                    localStorage.setItem('token', response.headers.authorization.split(' ')[1]);
                    localStorage.setItem('id', response.data.status.data.user.id)
                    localStorage.setItem('username', response.data.status.data.user.username);
                    setLoggedIn(true);
                    navigate(from);
                } else {
                    setAlert(true);
                }
            })
            .catch(error => console.log(error));
    };

    const handleSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    return (
        <div>
            <Navbar />
            <div className="main" id="login">
                <form onSubmit={handleSubmit} id="loginform">
                    <h1>Login</h1>
                    {alert ? <Alert severity="error">Wrong email or password</Alert> : <></>}
                    <TextField 
                        type="string" 
                        label="Username" 
                        id="username" 
                        name="username" 
                        value={username}
                        onKeyDown={handleSpace}
                        onChange={(e) => setUsername(e.target.value.trim())}
                        required
                    />
                    <TextField 
                        type="password" 
                        label="Password" 
                        id="password" 
                        name="password"
                        value={password}
                        onKeyDown={handleSpace}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <p>Don't have an account? <Link to='/signup' style={{textDecoration: 'underline', color: 'blue'}}>Sign Up</Link></p>
                    <Button type="submit" variant="contained">Log In</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;