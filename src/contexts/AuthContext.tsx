import React, { createContext, useEffect, useReducer, useState } from 'react';
import { User } from '@firebase/auth-types';
import { authReducer } from './AuthReducer';

//* Definir información
export interface AuthState {
    isLogged: boolean;
    id: string | undefined;
    role: 'admin' | 'client' | undefined;    
    user: User | null;
}

//* Estado inicial
export const authInitialState: AuthState = {
    isLogged: false,
    user: null,
    id: '',
    role: undefined
}

interface AuthContextProps {
    authState: AuthState;
    signIn: (user: AuthState) => void;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

const init = () => {

    const user = localStorage.getItem('user');

    if (user === null) {
        return { isLogged: false, user: null, id: undefined, role: undefined };
    } else {
      return JSON.parse(user);
    }

}

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(authState))
    }, [authState])

    const signIn = (user: AuthState) => {
        dispatch({
            type: 'login',
            payload: user
        })
    }

    const signOut = () => {
        dispatch({
            type: 'logout'
        })
    }

    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            signOut
        }}>
            {/* Solamente retornamos los elementos hijos cuando no este cargando. 
			De esta forma nos aseguramos de no cargar el resto de la app hasta que el usuario haya sido establecido.
			
			Si no hacemos esto al refrescar la pagina el componente children intenta cargar inmediatamente, 
			antes de haber comprobado que existe un usuario. */}
            {children}
        </AuthContext.Provider>
    )
}
