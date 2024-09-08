"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as Api from "@/api";

interface Userdata {
    id?: string,
    name?: string,
    email?: string,
}

interface AuthContextType {
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    userdata?: Userdata;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode,
}

export const AuthProvider = (props: Props) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userdata, setUserdata] = useState<Userdata>();

    useEffect(() => {
        const checkToken = async () => {  
            const result = await Api.auth.user();
            
            if (200 <= result.status && result.status < 300){
                setIsAuthorized(true);
                setUserdata({id: result.id, name: result.name, email: result.email});
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
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, isLoading, userdata }}>
            {props.children}
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