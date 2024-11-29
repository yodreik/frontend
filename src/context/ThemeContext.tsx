"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const savedTheme = Cookies.get("theme") as Theme;
        const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(prefersLight);
        }
    }, []);

    useEffect(() => {
        document.body.className = theme;
        Cookies.set("theme", theme, { expires: 365 });
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "light" : "dark");
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within an ThemeProvider");
    }
    return context;
};
