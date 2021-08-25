import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Error404 from '../error/Error404';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import Home from './Home';

const WebShopBackOffice = () => {

    return (
        <Switch>
            
            <Route exact path='/'>
                <LoginForm/>
            </Route>

            <Route path='/register'>
                <RegisterForm/>
            </Route>

            <Route path='/home'>
               <Home/>
            </Route>

            <Route component={Error404} />
        </Switch>
    )
}

export default WebShopBackOffice;