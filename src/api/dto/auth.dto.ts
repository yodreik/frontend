export interface UserDTO {
    id: string,
    email: string,
    username: string,
}

export interface LoginRequestDTO {
    email: string,
    password: string,
}

export interface LoginResponseDTO {
    token: string,
}

export interface RegisterRequestDTO {
    name: string,
    email: string,
    password: string,
}

export interface RegisterResponseDTO {
    id: string,
    email: string,
    name: string,
}