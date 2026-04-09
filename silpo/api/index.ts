import axios from "axios";
import APP_ENV from "../env/index";

const api = axios.create({
    baseURL: `${APP_ENV.API_URL}/api/`,
    headers: {
        "Content-Type": "application/json",
    },
})

export default api;