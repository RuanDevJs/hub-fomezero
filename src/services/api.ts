import axios from "axios";

const api = axios;
api.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export default api;
