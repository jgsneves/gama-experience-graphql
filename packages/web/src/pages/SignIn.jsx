import React from 'react';

const SignIn = () => {
    return (
        <form>
            <input type="email" id="email" name="email" inputmode="email" autocomplete="username" />
            <input type="password" id="password" name="password" inputmode="password" autocomplete="current-password" />
            <button type="submit">Entrar</button>
        </form>
    );
}

export default SignIn;