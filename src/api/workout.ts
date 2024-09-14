import { isAxiosError } from "axios";
import axiosInstance from "./core/axiosInstance";
import { workoutsRequestDTO, workoutsResponseDTO } from "./dto/workout.dto";
import { Error } from "./dto/error";

export const workouts = async (values: workoutsRequestDTO): Promise<workoutsResponseDTO | Error> => {
    try {
        const { data, status } = await axiosInstance.get("/me/workouts", {params: values});
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