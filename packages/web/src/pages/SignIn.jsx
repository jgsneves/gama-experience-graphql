import React from 'react';

const SignIn = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        }).then(response => response.json());
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                id="email" 
                name="email" 
                inputMode="email" 
                autoComplete="username" 
                onChange={(event) => setEmail(event.target.value)} 
                value={email}/>
            <input 
                type="password" 
                id="password" 
                name="password" 
                inputMode="password" 
                autoComplete="current-password" 
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                />
            <button type="submit">Entrar</button>
        </form>
    );
}

export default SignIn;