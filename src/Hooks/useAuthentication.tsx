import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthenticationContextProps{
    children: ReactNode
}

interface AuthenticationContext{
    isLogin: boolean,
    setIsLogin: (state: boolean) => void,
    errors: string[],
    setErrors: (state: string[]) => void,
    token: string,
    setToken: (state: string) => void
}

interface LoginCredentials {
    email:string,
    password:string
}

const authenticationContext = createContext<AuthenticationContext>({
    isLogin: false,
    setIsLogin: () => {},
    errors: [],
    setErrors: () => {},
    token: "",
    setToken: () => {}
});

export function AutheticationContextProvider({ children }:AuthenticationContextProps){

    const [ isLogin, setIsLogin ] = useState(false);
    const [ errors, setErrors ] = useState<string[]>([]);
    const [ token, setToken ] = useState("");

    return(
        <authenticationContext.Provider value={{ isLogin, setIsLogin, errors, setErrors, token, setToken }}>
            { children }
        </authenticationContext.Provider>
    )
}

export function useAuthentication(){    

    const context = useContext(authenticationContext);

    const { isLogin, setIsLogin, errors, setErrors, token, setToken } = context;

    useEffect(() => {
        const userToken = localStorage.getItem('token')
        if(userToken){
            setToken(userToken);
            token != '' && token != null ? setIsLogin(true) : setIsLogin(false);
        }
    },[token]);

    async function authenticate(credentials:LoginCredentials){
        const response = await fetch('https://mywallet-app-backend.herokuapp.com/users/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();

        if(response.ok){
            setIsLogin(true);
            setErrors([]);
            localStorage.setItem('token', data.token);
        }else{            
            setErrors([...errors, response.statusText]);
            setIsLogin(false);
        }        
    }

    return { isLogin, errors, authenticate, token };
}