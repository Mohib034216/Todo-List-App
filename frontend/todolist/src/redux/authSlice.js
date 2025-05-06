import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem('user'));

const BASE_URL = "http://localhost:8000/api/user/"
export const login = createAsyncThunk('auth/login',async (credential, thunkAPI) => {

    try{
        const response = await axios.post(`${BASE_URL}`,credential);
        return response.data
    }
    catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
}) 

export const UserSignup = createAsyncThunk('auth/register',async (data, thunkAPI) => {

    try{
        const response = await axios.post(`${BASE_URL}register/`,data);
        return response.data
    }
    catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
}) 
export const UserOtp = createAsyncThunk('auth/otp',async (data, thunkAPI) => {

    try{
        const response = await axios.post(`${BASE_URL}otp-verify/`,data);
        return response.data
    }
    catch(error){
        thunkAPI.rejectWithValue(error.response.data);
    }
}) 

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user: user || null,
        loading:null,    
        error:null,    
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(login.pending,(state, action) => {
                state.loading = true;
                state.user = action.payload;

            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                // state.user = action.payload;
                state.user = action.payload;   
                // console.log(state.user.refresh) ;
                localStorage.setItem('user',JSON.stringify(state.user))
             
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                // console.log(action.payload);
                // state.user = action.payload;
                state.error = action.payload;    

            })
            .addCase(UserSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
                // console.log(action.payload);
                localStorage.setItem('user',JSON.stringify(state.user))
                alert(action.payload.message) ;
              
            })
            .addCase(UserSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;    

            })
            .addCase(UserOtp.fulfilled, (state, action) => {
                state.loading = false;
                alert(action.payload.message) ;
              
            })
            .addCase(UserOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                alert(action.payload.message)    

            })
    }


})

export default authSlice.reducer