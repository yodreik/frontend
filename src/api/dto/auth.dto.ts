export interface UserDTO {
    id?: string,
    name?: string,
    email?: string,
    status: number,
}

export interface LoginRequestDTO {
    email: string,
    password: string,
}

export interface LoginResponseDTO {
    token?: string,
    status: number,
}

export interface RegisterRequestDTO {
    name: string,
    email: string,
    password: string,
}

export interface RegisterResponseDTO {
    id?: string,
    email?: string,
    name?: string,
    status: number,
}

export interface ConfirmRegistrationRequestDTO {
    token: string | null,
}

export interface ConfirmRegistrationResponseDTO {
    status: number,
}

export interface ForgotPasswordRequestDTO {
    email: string,
}

export interface ForgotPasswordResponseDTO {
    status: number,
}

export interface ResetPasswordRequestDTO {
    password: string,
    token: string | null,
}

export interface ResetPasswordResponseDTO {
    status: number,
}