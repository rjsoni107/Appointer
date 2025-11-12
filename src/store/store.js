// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducerSlice/modalSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
    },
});