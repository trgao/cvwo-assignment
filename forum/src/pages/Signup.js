import axios from "axios";
import Navbar from "../components/Navbar";
import { TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "..";

function Signup() {
    const navigate = useNavigate();
    const url = 'http://localhost:3000/signup';
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmPass] = useState('');
    const [alert, setAlert] = useState(false);
    const [alerttext, setAlertText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (confirmpass !== password) {
            setAlert(true);
            setAlertText('Password is not the same');
            return;
        }
        if (password.length < 6) {
            setAlert(true);
            setAlertText('Password is too short (minimum is 6 characters)')
            return;
        }

        const user = {
            user: {
                email: email, 
                password: password,
                username: username
            }
        };

        axios.post(url, user)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.headers.authorization.split(' ')[1]);
                localStorage.setItem('id', response.data.user.id)
                localStorage.setItem('username', response.data.user.username);
                setLoggedIn(true);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 422) {
                    setAlert(true);
                    setAlertText(error.response.data.status.message + '.');
                }
            });
    };

    const handleSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    return (
        <div>
            <Navbar />
            <div className="main" id="signup">
                {alert ? <Alert severity="error">{alerttext}</Alert> : <></>}
                <form onSubmit={handleSubmit} id="signupform">
                    <h1>Signup</h1>
                    <TextField 
                        type="email" 
                        label="Email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onKeyDown={handleSpace}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField 
                        type="string" 
                        label="Username" 
                        id="username" 
                        name="username" 
                        value={username}
                        onKeyDown={handleSpace}
                        onChange={(e) => setUsername(e.target.value)}
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
                        InputProps={{ minLength: 6 }} 
                        required
                    />
                    <TextField 
                        type="password" 
                        label="Confirm Password" 
                        id="confirmpass" 
                        name="confirmpass"
                        value={confirmpass}
                        onKeyDown={handleSpace}
                        onChange={(e) => setConfirmPass(e.target.value)}  
                        required
                    />
                    <Button type="submit" variant="contained">Confirm</Button>
                </form>
            </div>
        </div>
    )
}

export default Signup;