import { isAxiosError } from "axios";
import axiosInstance from "./core/axiosInstance";
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from "./dto/auth.dto";
import { Error } from "./dto/error";

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