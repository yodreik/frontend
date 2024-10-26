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



export interface UpdateUserRequestDTO {
    username?: string,
    display_name?: string, 
    email?: string,
    is_private?: boolean,
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