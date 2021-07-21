import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './pages/home';
import SignIn from './pages/SignIn';

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/sign-in" component={SignIn}/>
        </Switch>
    )
}

export default AppRouter;