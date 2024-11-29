import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Redux/UserSlice'
const Store = configureStore({
    reducer: {
        users: userReducer
    }
})

export default Store