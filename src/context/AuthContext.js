"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Api from "@/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {  
            const result = await Api.auth.user();
            
            if (200 <= result.status && result.status < 300){
                setIsAuthorized(true);
            }
            else {
                setIsAuthorized(false);
            }

            setIsLoading(false);
        };

        checkToken();

        const handleStorageChange = () => {
            checkToken();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};