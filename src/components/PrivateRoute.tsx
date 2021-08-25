import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...remainingProperties }: any) => {
    const { authState } = React.useContext(AuthContext);
    if (authState.isLogged && authState.role === 'admin') {
        return <Route {...remainingProperties}>{children}</Route>
    } else {
        return <Redirect to="/login" />
    }
}

export default PrivateRoute;