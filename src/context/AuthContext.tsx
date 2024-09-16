"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Api from "@/api";

interface Userdata {
    id?: string,
    username?: string,
    display_name: string,
    email?: string,
}

interface AuthContextType {
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    userdata?: Userdata;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userdata, setUserdata] = useState<Userdata>();

    useEffect(() => {
        const checkToken = async () => {  
            const result = await Api.auth.user();
            
            if (!("message" in result)){
                setIsAuthorized(true);
                setUserdata({id: result.id, username: result.username, display_name: result.display_name, email: result.email});
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
    }, [isAuthorized]);

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, isLoading, userdata }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};