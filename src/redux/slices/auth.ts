import { createSlice } from "@reduxjs/toolkit";

const initialState = { // Giá trị mặc định của state
    user: null,
};

const authSlice = createSlice({ 
    name: 'auth', // Tên của slice
    initialState, // Giá trị mặc định của state
    reducers: { // Các reducers của slice
        setUser: (state, action) => {   // Reducer để set user
            state.user = action.payload;
        },
        logout: (state) => { // Reducer để logout
            state.user = null;
        }
    },
});

export const { setUser, logout } = authSlice.actions; // Export các actions của slice
export default authSlice.reducer; // Export reducer của slice