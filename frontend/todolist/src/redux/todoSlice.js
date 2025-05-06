import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import axiosInstance from '../api/axiosconfig';

const user = JSON.parse(localStorage.getItem('user'));
// console.log(user.user_email)

export const getTodo = createAsyncThunk('todo/get',async ( thunkAPI) => {

    try{
        const response = await axiosInstance.get('/task/');
        console.log(response)
        return response.data
    }
    catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
}) 

export const addTodo = createAsyncThunk('todo/add',async (data, thunkAPI) => {

    try{
        const response = await axiosInstance.post('/task/',data);
        return response.data
    }
    catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
}) 
export const removeTodo = createAsyncThunk('todo/remove',async (id,thunkAPI) => {

    try{
        const response = await axiosInstance.delete(`/task/${id}`);
        return response.data
    }
    catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
}) 
export const updateTodo = createAsyncThunk('todo/update',async ({id,status},thunkAPI) => {
    console.log(id)
    
    try{
        const response = await axiosInstance.put(`/task/${id}`,{'status':status});
        console.log(response)
        return response.data
    }
    catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
}) 

const todoSlice = createSlice({
    name:'todo',
    initialState:{
        items:  [],
        loading:null,    
        error:null,    
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(getTodo.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.task);
                state.items = action.payload.task;   
                console.log(state.items);
                
            })
            .addCase(getTodo.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                // state.user = action.payload;
                state.error = action.payload;    
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.items.push(action.payload)
                
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                // state.user = action.payload;
                state.error = action.payload;    
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => (item.id !== action.payload))   
                
            })
            .addCase(removeTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;    
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload
                const index = state.items.findIndex((item) => (item.id === updated.id))
                
                if(index !== -1){
                    console.log(state.items[index])
                    state.items[index]= updated;
                }
                // console.log(state.items)
                
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                // state.user = action.payload;
                state.error = action.payload;    
            })
    }


})

export default todoSlice.reducer