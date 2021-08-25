import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
//import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './contexts/AuthContext';
import Dashboard from './components/DashBoard';


function App() {

  const { authState } = useContext(AuthContext);

  return (
    <Switch>

      <Route path='/login'>
        {authState.isLogged ? <Redirect to="/" /> : <LoginForm />}
      </Route>

      <Route path='/register'>
        {authState.isLogged ? <Redirect to="/" /> : <RegisterForm />}
      </Route>

      <PrivateRoute path='/'>
        <Dashboard />
      </PrivateRoute>

    </Switch>
  );
}

export default App;
