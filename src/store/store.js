// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducerSlice/modalSlice';
import locationReducer from './reducerSlice/locationSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        location: locationReducer,
    },
});