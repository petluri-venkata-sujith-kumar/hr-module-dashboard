import axios from "axios";

let BaseUrl="http://106.51.76.167:8080/"
export const AxiosInstance=axios.create({
    baseURL:BaseUrl,
})
