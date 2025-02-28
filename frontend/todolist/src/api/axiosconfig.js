
import axios from "axios";

const BASE_URL = "http://localhost:8000"; //Django API URL
const  axiosInstance = axios.create({
baseURL:BASE_URL,
timeout:5000,
headers:{
    "content-type":"application/json",
}
});
 

export default axiosInstance
