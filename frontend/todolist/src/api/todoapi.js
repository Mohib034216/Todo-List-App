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
export const setTodo = async (data)=>{
    try {
        const response = await axiosInstance.post('api/',{data});
        // console.log(response)
        return response.data
        

    } catch(error){
        console.error("Error creating todo:", error);
        throw error

    }
}