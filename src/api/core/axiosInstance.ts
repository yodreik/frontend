import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: "https://dreik.d.qarwe.online/api"
})

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("token");

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default axiosInstance;