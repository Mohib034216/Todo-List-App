import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todoSlice';


export const store = configureStore({
    reducer:{
        auth:authReducer,
        todo:todoReducer,
    }
})