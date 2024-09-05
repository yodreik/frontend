"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            
            const endpoint = "http://localhost:6969/api/me";

            const res = await fetch(endpoint, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (res.ok) {
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