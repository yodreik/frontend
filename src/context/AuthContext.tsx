"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Api from "@/api";

interface Userdata {
    id: string,
    username: string,
    display_name: string,
    email: string,
    avatar_url: string,
    created_at: string,
    is_confirmed: boolean,
    is_private: boolean
}

interface AuthContextType {
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    userdata: Userdata;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userdata, setUserdata] = useState<Userdata>({
        id: "", 
        username: "", 
        display_name: "", 
        email: "",
        avatar_url: "",
        created_at: "",
        is_confirmed: false,
        is_private: false
    });

    useEffect(() => {
        const checkToken = async () => {  
            const result = await Api.account.user();
            
            if (!("message" in result)){
                setIsAuthorized(true);
                setUserdata({
                    id: result.id, 
                    username: result.username, 
                    display_name: result.display_name, 
                    email: result.email,
                    avatar_url: result.avatar_url,
                    created_at: result.created_at,
                    is_confirmed: result.is_confirmed,
                    is_private: result.is_private
                });
                localStorage.setItem('userdata', JSON.stringify(userdata));
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