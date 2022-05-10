import React, { useState, useEffect, useContext, SetStateAction, Dispatch } from 'react';
import { fetchVerifyUser, fetchLogout, fetchSignup, fetchLogin } from '../services/auth';
import { RequestError } from '../types/error';
import { IUser } from '../types/user';

interface AuthContextInterface {
    activeUser: IUser | null;
    setActiveUser: Dispatch<SetStateAction<IUser | null>>;
    authLoading: boolean;
    authError: RequestError | null;
    signup(body: UserAuthBody): void;
    login(body: UserAuthBody): void;
    logout(): void;
    [key: string]: any;
}

interface UserAuthBody {
    email: string;
    password: string;
}

const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface);

export default function AuthProvider({ children }: any) {
    const [activeUser, setActiveUser] = useState<IUser | null>(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState<RequestError | null>(null);

    useEffect(() => {
        setAuthLoading(true)
        fetchVerifyUser()
            .then(user => setActiveUser(user))
            .catch(err => setAuthError(err))
            .finally(() => setAuthLoading(false))
    }, [])

    const signup = (body: UserAuthBody) => {
        setAuthError(null)
        setAuthLoading(true)
        return fetchSignup(body)
            .then(setActiveUser)
            .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }

    const login = (body: UserAuthBody) => {
        setAuthError(null)
        setAuthLoading(true)
        return fetchLogin(body)
            .then(setActiveUser)
            .catch(err => setAuthError(err.message))
            .finally(() => setAuthLoading(false))
    }

    const logout = () => fetchLogout().then(() => setActiveUser(null))

    return (
        <AuthContext.Provider value={{ activeUser, setActiveUser, authLoading, authError, signup, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuthSelector = (value: string) => useContext(AuthContext)[value]

export const useActiveUser = () => useAuthSelector('activeUser')
export const useSetActiveUser = () => useAuthSelector('setActiveUser')
export const useSignup = () => useAuthSelector('signup')
export const useLogin = () => useAuthSelector('login')
export const useLogout = () => useAuthSelector('logout')
export const useAuthError = () => useAuthSelector('authError')
export const useAuthLoading = () => useAuthSelector('authLoading')