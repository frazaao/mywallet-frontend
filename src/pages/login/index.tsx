import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAuthentication } from '../../Hooks/useAuthentication';
import styles from './styles.module.css';

export default function Login(){

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { isLogin, errors, authenticate } = useAuthentication();

    isLogin == true ? (
        window.location.href = "/transactions"
    ) : (
        null
    );

    const handleLogin = useCallback((e:FormEvent) => {
        e.preventDefault();
        if(loginRef.current != null && passwordRef.current != null) {
            authenticate({
                email: loginRef.current?.value,
                password: passwordRef.current?.value
            })
        }
    },[authenticate]);

    useEffect(() => {
        console.log(errors)
    }, [errors]);

    return(
        <main className={styles.loginContainer}>
            <h1>MyWallet</h1>
            <form className={styles.loginForm}>

                <label htmlFor="login">
                    <span>Login</span>
                    <input 
                        ref={loginRef} 
                        type="text" 
                        name="login" 
                        id="login" 
                    />
                </label>

                <label htmlFor="password">
                    <span>Senha</span>
                    <input 
                        ref={passwordRef} 
                        type="password" 
                        name="password" 
                        id="password" 
                    />
                </label>

                <button 
                    type="submit" 
                    onClick={handleLogin}
                >Entrar
                </button>
                
                <a href="#">Não possui conta? <span>Cadastre-se</span></a>
            </form>
        </main>
    )
}