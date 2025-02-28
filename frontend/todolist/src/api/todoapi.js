import axios from "axios";
import axiosInstance from "./axiosconfig"

export const getTodo = async ()=>{
    try {
        const response = await axiosInstance.get('api/');
        // console.log(response)
        return response.data
        

    } catch(error){
        console.error("Error fetching todo:", error);
        throw error

    }
}