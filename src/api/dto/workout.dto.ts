export interface workoutsRequestDTO {
    begin: string,
    end: string,
}

export interface workoutsResponseDTO {
    user_id: string,
    count: number,
    workouts: {
        id: string,
        date: string,
        duration: number,
        kind: string,
    }[],
    status: number,
}