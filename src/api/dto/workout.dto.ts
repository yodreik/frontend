export interface workoutRequestDTO {
    date: string,
    duration: number,
    kind: string
}

export interface workoutResponseDTO {
    id: string,
    date: string,
    duration: number,
    kind: string,
    status: number
}



export interface activityRequestDTO {
    begin?: string,
    end?: string
}

export interface activityResponseDTO {
    user_id: string,
    count: number,
    workouts: {
        id: string,
        date: string,
        duration: number,
        kind: string
    }[],
    status: number
}



export interface statisticsResponseDTO {
    user_id: string,
    minutes_spent: number,
    longest_activity: number,
    status: number
}