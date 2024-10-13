export interface UserDTO {
    id: string,
    username: string,
    display_name: string, 
    email: string,
    avatar_url: string,
    created_at: string,
    is_confirmed: boolean,
    is_private: boolean,
    status: number
}



export interface UpdateUserDTO {
    username: string,
    display_name: string, 
    email: string,
    avatar_url: string,
    is_private: boolean,
    status: number
}



export interface LoginRequestDTO {
    login: string,
    password: string
}

export interface LoginResponseDTO {
    token: string,
    status: number
}



export interface RegisterRequestDTO {
    username: string,
    email: string,
    password: string
}

export interface RegisterResponseDTO {
    id: string,
    username: string,
    display_name: string, 
    email: string,
    avatar_url: string,
    created_at: string,
    is_confirmed: boolean,
    is_private: boolean,
    status: number
}



export interface ConfirmRegistrationRequestDTO {
    token: string | null
}

export interface ConfirmRegistrationResponseDTO {
    status: number
}



export interface ForgotPasswordRequestDTO {
    email: string
}

export interface ForgotPasswordResponseDTO {
    status: number
}



export interface ResetPasswordRequestDTO {
    password: string,
    token: string | null
}

export interface ResetPasswordResponseDTO {
    status: number
}
