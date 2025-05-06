
import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; //Django API URL
const  axiosInstance = axios.create({
baseURL:BASE_URL,

});

axiosInstance.interceptors.request.use(
    (config) =>  {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    console.log(userData.refresh)
    if (userData.access){
        config.headers.Authorization = `Bearer ${userData.access}`;
    }
    return config;
    },
    (error) => Promise.reject(error)
)


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const userData = JSON.parse(localStorage.getItem('user') || '{}')
        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            userData?.refresh
        ){
            originalRequest._retry = true;  

            try{
                    const res = await axiosInstance.post(`/user/token/refresh/`,{'refresh':userData?.refresh})
                    console.log(res)
                    const newAccess = res.data.access;
                    const userDataUpdated = {...userData, access:newAccess};
                    localStorage.setItem('user',JSON.stringify(userDataUpdated));

                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                    return axiosInstance(originalRequest);
            
                }
            catch(Refresherror){
                localStorage.removeItem('user')
                window.location.href = '/login'
                return Promise.reject(Refresherror)

            }

        }
        return Promise.reject(error)
    }

)
 

export default axiosInstance
