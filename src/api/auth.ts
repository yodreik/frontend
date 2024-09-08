import { isAxiosError } from "axios";
import axiosInstance from "./core/axiosInstance";
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from "./dto/auth.dto";
import { ErrorDTO } from "./dto/error.dto"

export const login = async (values: LoginRequestDTO): Promise<LoginResponseDTO | ErrorDTO> => {
    try {
        return (await axiosInstance.post("/auth/login", values)).data;
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            return {
                status: error.response.status,
                message: error.response.data?.message,
            }
        }
        else {
            return {
                status: 500,
                message: "An unexpected error occurred",
            }
        }
    }
}

export const register = async (values: RegisterRequestDTO): Promise<RegisterResponseDTO | ErrorDTO> => {
    try {
        return (await axiosInstance.post("/auth/signup", values)).data;
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            return {
                status: error.response.status,
                message: error.response.data?.message,
            }
        }
        else {
            return {
                status: 500,
                message: "An unexpected error occurred",
            }
        }
    }
}

