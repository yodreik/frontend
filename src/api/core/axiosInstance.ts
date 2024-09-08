import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:6969/api"
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default axiosInstance;