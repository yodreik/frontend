"use client";

import { useToast } from "@/context/ToastContext";
import Button from "@/components/Button/Button";
import React from "react";

const AuthenticatePage = () => {
    const { success } = useToast();

    return (
        <>
            <Button
                label="Success1"
                onClick={
                    () => success("HUI1", "hui2")
                }
            />
            <Button
                label="Success2"
                onClick={
                    () => success("HUI2", "hui2")
                }
            />
            <Button
                label="Success3"
                onClick={
                    () => success("HUI3", "hui2")
                }
            />
            <Button
                label="Success4"
                onClick={
                    () => success("HUI4", "hui2")
                }
            />
            <Button
                label="Success5"
                onClick={
                    () => success("HUI5", "hui2")
                }
            />
        </>
    );
};

export default AuthenticatePage;
