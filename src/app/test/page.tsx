"use client";

import Button from "@/components/button/button";
import style from "./page.module.css";
import Input from "@/components/input/input";
import { ChangeEvent, useState } from "react";
import Toast from "@/components/toast/toast";
import React from "react";

const AuthenticatePage = () => {
    return (
        <>
            <Toast
                type={"error"}
                title={"Ooops!"}
                message={"User with this email already exists"}
            />
        </>
    );
};

export default AuthenticatePage;
