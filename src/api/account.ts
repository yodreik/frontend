import { isAxiosError } from "axios";
import axiosInstance from "./core/axiosInstance";
import { UserDTO, ConfirmRegistrationRequestDTO, ConfirmRegistrationResponseDTO, ForgotPasswordRequestDTO, ForgotPasswordResponseDTO, ResetPasswordRequestDTO, ResetPasswordResponseDTO, UpdateUserDTO } from "./dto/account.dto";
import { Error } from "./dto/error";

export const user = async (): Promise<UserDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.get("/account");
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? 
            { message: error.response.data, status: error.response.status } :
            { message: "An unknown error occurred", status: 500 };
    }
}

export const updateUser = async (): Promise<UpdateUserDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.patch("/account");
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? 
            { message: error.response.data, status: error.response.status } :
            { message: "An unknown error occurred", status: 500 };
    }
}

export const confirmRegistration = async (values: ConfirmRegistrationRequestDTO): Promise<ConfirmRegistrationResponseDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.post("/account/confirm", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? 
            { message: error.response.data, status: error.response.status } :
            { message: "An unknown error occurred", status: 500 };
    }
}

export const forgotPassword = async (values: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.post("/account/reset-password/request", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? 
            { message: error.response.data, status: error.response.status } :
            { message: "An unknown error occurred", status: 500 };
    }
}

export const resetPassword = async (values: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.patch("/account/reset-password", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? 
            { message: error.response.data, status: error.response.status } :
            { message: "An unknown error occurred", status: 500 };
    }
}