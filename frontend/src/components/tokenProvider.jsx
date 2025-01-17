import { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // return sessionStorage.getItem('ExperoAuth') || null;
        return localStorage.getItem('ExperoAuth') || null; 
    });

    const saveToken = (newToken) => {
        setToken(newToken);
        sessionStorage.setItem('ExperoAuth', newToken); 
        localStorage.setItem('ExperoAuth', newToken); 
    };

    const fetchToken = () => {
        // const storedToken = sessionStorage.getItem('ExperoAuth');
        const storedToken = localStorage.getItem('ExperoAuth');
        setToken(storedToken); 
        return storedToken; 
    };

    const clearToken = () => {
        setToken(null);
        sessionStorage.removeItem('ExperoAuth');
        localStorage.removeItem('ExperoAuth');
    };

    return (
        <TokenContext.Provider value={{ token, saveToken, fetchToken, clearToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);
