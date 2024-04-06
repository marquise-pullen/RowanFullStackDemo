import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess, setUsername }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const login = async (e) => {
        e.preventDefault();
        setError('');

        fetch(`${process.env.EXPRESS_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {

            onLoginSuccess();
            setUsername(data.user.username);
        }).catch(err => {
            setError('Failed to login. Please check your credentials.');
            console.error('Login error', err);
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <label htmlFor="email">Email:<input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                /></label>
                <br />
                <label htmlFor="password">Password:<input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                /></label>
                <br />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
