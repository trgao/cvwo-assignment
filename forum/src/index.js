import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './index.css';

const token = localStorage.getItem('token');

export function getLoggedIn() {
    return JSON.parse(localStorage.getItem('logged'));
}
export function setLoggedIn(bool) {
    localStorage.setItem('logged', bool);
}

if (token === null) {
    localStorage.setItem('token', '');
    setLoggedIn(false);
} else if (token !== '') {
    setLoggedIn(true);
} else if (token === '') {
    setLoggedIn(false);
}
if (localStorage.getItem('id') === null) {
    localStorage.setItem('id', '');
}
if (localStorage.getItem('username') === null) {
    localStorage.setItem('username', '');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);