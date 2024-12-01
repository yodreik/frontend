"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

type Theme = "light" | "dark";
type Color = "black" | "aqua" | "green";

interface ThemeContextType {
    theme: Theme;
    color: Color;
    toggleTheme: () => void;
    changeTheme: (theme: Theme) => void;
    changeColor: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const [color, setColor] = useState<Color>(theme === "light" ? "black" : "aqua");

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
        const savedColor = Cookies.get("color") as Color;

        if (savedColor) {
            setColor(savedColor);
        } else {
            setColor(theme === "light" ? "black" : "aqua");
        }
    }, []);

    useEffect(() => {
        document.body.className = theme + " " + color;
        console.log(color);
        Cookies.set("theme", theme, { expires: 365 });
        Cookies.set("color", color, { expires: 365 });
    }, [theme, color]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "light" : "dark");
            setColor(e.matches ? "black" : "aqua");
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setColor(newTheme === "light" ? "black" : "aqua");
    };

    const changeTheme = (theme: Theme) => {
        setTheme(theme);
        setColor(theme === "light" ? "black" : "aqua");
    };

    const changeColor = (color: Color) => {
        setColor(color);
    };

    return <ThemeContext.Provider value={{ theme, color, toggleTheme, changeTheme, changeColor }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within an ThemeProvider");
    }
    return context;
};
