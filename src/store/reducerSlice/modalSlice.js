// src/features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoginOpen: false,
    isRegisterOpen: false,
    isKYCModal: false,
    isThankYouOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openLogin: (state) => {
            state.isLoginOpen = true;
        },
        closeLogin: (state) => {
            state.isLoginOpen = false;
        },
        openRegister: (state) => {
            state.isRegisterOpen = true;
        },
        closeRegister: (state) => {
            state.isRegisterOpen = false;
        },
        openKYCModal: (state) => {
            state.isKYCModal = true;
        },
        closeKYCModal: (state) => {
            state.isKYCModal = false;
        },
        openThankYouModal: (state) => {
            state.isThankYouOpen = true;
        },
        closeThankYouModal: (state) => {
            state.isThankYouOpen = false;
        },
    },
});

export const {
    openLogin,
    closeLogin,
    openRegister,
    closeRegister,
    openKYCModal,
    closeKYCModal,
    openThankYouModal,
    closeThankYouModal,
} = modalSlice.actions;

export default modalSlice.reducer;