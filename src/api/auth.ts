import { isAxiosError } from "axios";
import axiosInstance from "./core/axiosInstance";
import { UserDTO, LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO,  ConfirmRegistrationRequestDTO, ConfirmRegistrationResponseDTO, ForgotPasswordRequestDTO, ForgotPasswordResponseDTO, ResetPasswordRequestDTO, ResetPasswordResponseDTO, UpdateUserDTO } from "./dto/auth.dto";
import { Error } from "./dto/error";

export const user = async (): Promise<UserDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.get("/auth/account");
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
        const { data, status } = await axiosInstance.patch("/auth/account");
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

export const login = async (values: LoginRequestDTO): Promise<LoginResponseDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.post("/auth/session", values);
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

export const register = async (values: RegisterRequestDTO): Promise<RegisterResponseDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.post("/auth/account", values);
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
        const { data, status } = await axiosInstance.post("/auth/account/confirm", values);
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
        const { data, status } = await axiosInstance.post("/auth/password/reset", values);
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
        const { data, status } = await axiosInstance.patch("/auth/password", values);
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