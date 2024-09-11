"use client";

import { useToast } from "@/context/ToastContext";
import Button from "@/components/button/button";
import React from "react";

const AuthenticatePage = () => {
    const { success } = useToast();

    return (
        <>
            <Button
                label="Success"
                onClick={
                    () => success("HUI", "hui2")
                }
            />
        </>
    );
};

export default AuthenticatePage;
