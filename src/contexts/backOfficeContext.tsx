import React, { useState, createContext } from 'react'
import { UserCredential, User } from '@firebase/auth-types';

interface userAdmin {
    isLogged?: boolean;
    user: User | UserCredential | null;
}

interface backofficeContextProps {

}

export const backofficeContext = createContext({} as backofficeContextProps);

export const BackOfficeProvider = ({ children }: { children: JSX.Element }) => {

    return (
        <backofficeContext.Provider value={{

            
        }}>
            {children}
        </backofficeContext.Provider>
    )
}