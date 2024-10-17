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