// import axios from "axios";
// import axiosInstance from "./axiosconfig"
// import { useSelector } from "react-redux";

// const user =  JSON.parse(localStorage.getItem('user'));
// console.log(user.user_email);
// export const getTodo = async ()=>{
//     try {
//         const response = await axiosInstance.get('/task/',{'email':user.user_email});
//         // console.log(response)
//         return response.data
        

//     } catch(error){
//         console.error("Error fetching todo:", error);
//         throw error

//     }
// }
// export const setTodo = async (data)=>{
//     try {
//         const response = await axiosInstance.post('api/task/',{data});
//         // console.log(response)
//         return response.data
        

//     } catch(error){
//         console.error("Error creating todo:", error);
//         throw error

//     }
// }
// export const removeTodo = async (key)=>{
//     try {
//         const response = await axiosInstance.delete(`api/task/${key}/`);
//         return response.data
        

//     } catch(error){
//         console.error("Error creating todo:", error);
//         throw error

//     }
// }
// export const updateTodo = async (key,data)=>{
//     try {
//         const response = await axiosInstance.put(`api/task/${key}/`,data);
//         return response.data
        

//     } catch(error){
//         console.error("Error creating todo:", error);
//         throw error

//     }
// }

// // export const Users  =  async (key, data) => {

// //     try{
// //         const response = axiosInstance.get('api/user/',data)
// //         console.log(response)
// //         return response

// //     }
// //     catch(error){
// //         console.error("Error Something wrong", error)
// //         throw error
// //     }
// // }
// // export const UserSignup  =  async (data) => {

// //     try{
// //         const response = axiosInstance.post('api/registration/',data)
// //         return response

// //     }
// //     catch(error){
// //         console.error("Error Something wrong", error)
// //         throw error
// //     }
// // }
// // export const UserSignin  =  async (data) => {

// //     try{
// //         const response = axiosInstance.post('api/login/',data)
// //         return response

// //     }
// //     catch(error){
// //         console.error("Error Something wrong", error)
// //         throw error
// //     }
// // }

// // export const UserSignout  =  async (key, data) => {

// //     try{
// //         const response = axiosInstance.post('api/',data)
// //         return response.data

// //     }
// //     catch(error){
// //         console.error("Error Something wrong", error)
// //         throw error
// //     }
// // }