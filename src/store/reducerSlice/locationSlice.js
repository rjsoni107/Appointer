// store/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: "",
    raw: null, // full payload from reverse geocode if needed
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.city = action.payload.city || action.payload;
            state.raw = action.payload.raw || action.payload;
        },
        clearLocation: (state) => {
            state.city = "";
            state.raw = null;
        },
    },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
