import { isAxiosError } from "axios";
import axiosInstance from "./core/axiosInstance";
import { workoutRequestDTO, workoutResponseDTO, activityRequestDTO, activityResponseDTO } from "./dto/workout.dto";
import { Error } from "./dto/error";

export const workouts = async (values: workoutRequestDTO): Promise<workoutResponseDTO| Error> => {
    try {
        const { data, status } = await axiosInstance.post("/workout", values);
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

export const activity = async (values: activityRequestDTO): Promise<activityResponseDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.get("/activity", {params: values});
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