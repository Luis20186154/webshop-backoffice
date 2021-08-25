import { AuthState } from "./AuthContext"
import { User } from '@firebase/auth-types';

type AuthAction = 
    | {type: 'login', payload: AuthState}
    | {type: 'logout'}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'login':
            return {
                ...state,
                isLogged: action.payload.isLogged,
                id: action.payload.id,
                role: action.payload.role,
                user: action.payload.user,
            }

        case 'logout':
            return {
                ...state,
                isLogged: false,
                id: undefined,
                role: undefined,
                user: null,
            }
    
        default:
            return state;
    }

}