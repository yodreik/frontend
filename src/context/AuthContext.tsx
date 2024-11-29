"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import * as Api from "@/api";
import { toast } from 'sonner';

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
    
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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

    const extractSavedData = () => {
        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
            setUserdata(JSON.parse(savedUserData));
        }
    }

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

                localStorage.setItem("userData", JSON.stringify(userData));
                
                setIsAuthorized(true);
                setUserdata(userData);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            toast.error("Unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        extractSavedData();
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
        localStorage.removeItem("userData");
        Cookies.remove("token");
        router.replace("/");
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