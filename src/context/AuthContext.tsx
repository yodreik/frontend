"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
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
    isLoading: boolean;
    userdata: Userdata;
    logout: () => void;
    refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    
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

    const refreshUserData = async () => {
        setIsLoading(true);
        try {
            const result = await Api.account.user();
            if (!("message" in result)) {
                const userData = {
                    id: result.id, 
                    username: result.username, 
                    display_name: result.display_name, 
                    email: result.email,
                    avatar_url: result.avatar_url,
                    created_at: result.created_at,
                    is_confirmed: result.is_confirmed,
                    is_private: result.is_private
                };
                
                setIsAuthorized(true);
                setUserdata(userData);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            // TODO: toast
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshUserData();
    }, []);

    const logout = () => {
        setIsAuthorized(false);
        setUserdata({
            id: "", 
            username: "", 
            display_name: "", 
            email: "",
            avatar_url: "",
            created_at: "",
            is_confirmed: false,
            is_private: false
        });
        Cookies.remove("token");
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ isLoading, isAuthorized, userdata, refreshUserData, logout }}>
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