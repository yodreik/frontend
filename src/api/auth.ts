import { isAxiosError } from "axios";
import axiosInstance from "./core/axiosInstance";
import { UserDTO, LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO,  ConfirmRegistrationRequestDTO, ConfirmRegistrationResponseDTO, ForgotPasswordRequestDTO, ForgotPasswordResponseDTO, ResetPasswordRequestDTO, ResetPasswordResponseDTO } from "./dto/auth.dto";

export const user = async (): Promise<UserDTO> => {
    try {
        const { data, status } = await axiosInstance.get("/me");
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? { status: error.response.status } : { status: 500 };
    }
}

export const login = async (values: LoginRequestDTO): Promise<LoginResponseDTO> => {
    try {
        const { data, status } = await axiosInstance.post("/auth/login", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? { status: error.response.status } : { status: 500 };
    }
}

export const register = async (values: RegisterRequestDTO): Promise<RegisterResponseDTO> => {
    try {
        const { data, status } = await axiosInstance.post("/auth/register", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? { status: error.response.status } : { status: 500 };
    }
}

export const confirmRegistration = async (values: ConfirmRegistrationRequestDTO): Promise<ConfirmRegistrationResponseDTO> => {
    try {
        const { data, status } = await axiosInstance.post("/auth/confirm", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? { status: error.response.status } : { status: 500 };
    }
}

export const forgotPassword = async (values: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO> => {
    try {
        const { data, status } = await axiosInstance.post("/auth/password/reset", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? { status: error.response.status } : { status: 500 };
    }
}

export const resetPassword = async (values: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO> => {
    try {
        const { data, status } = await axiosInstance.patch("/auth/password/update", values);
        return {
            ...data,
            status: status,
        }
    }
    catch (error) {
        return isAxiosError(error) && error.response ? { status: error.response.status } : { status: 500 };
    }
}