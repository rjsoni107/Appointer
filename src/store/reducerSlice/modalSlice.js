// src/features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoginOpen: false,
    isRegisterOpen: false,
    isProviderRegisterOpen: false,
    isThankYouOpen: false,
    isSidebarOpen: false,
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
        openProviderRegister: (state) => {
            state.isProviderRegisterOpen = true;
        },
        closeProviderRegister: (state) => {
            state.isProviderRegisterOpen = false;
        },
        openThankYouModal: (state) => {
            state.isThankYouOpen = true;
        },
        closeThankYouModal: (state) => {
            state.isThankYouOpen = false;
        },
        openSidebar: (state) => {
            state.isSidebarOpen = true;
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false;
        },
    },
});

export const {
    openLogin,
    closeLogin,
    openRegister,
    closeRegister,
    openProviderRegister,
    closeProviderRegister,
    openThankYouModal,
    closeThankYouModal,
    openSidebar,
    closeSidebar,
} = modalSlice.actions;

export default modalSlice.reducer;