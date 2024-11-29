import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userList: []
}

export const addUser = createAsyncThunk('/user/addUser', async (data) => {
    const res = await axios.post("http://localhost:3000/users", data)
    // console.log(res.data);
    return res.data
})

export const viewUser = createAsyncThunk('/user/viewUser', async () => {
    const res = await axios.get("http://localhost:3000/users")
    // console.log(res.data);
    return res.data

})

export const deleteUser = createAsyncThunk('/user/deleteUser', async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`)
    return id
})

export const singleUser = createAsyncThunk('/user/singleUser', async (id) => {
    const res = await axios.get(`http://localhost:3000/users/${id}`)
    return res.data
})

export const edituser = createAsyncThunk('/user/edituser', async (data) => {
    console.log("data...................")
    console.log(data)
    const { id } = data;
    console.log("id..............")
    console.log(id)
    const res = await axios.put(`http://localhost:3000/users/${id}`, data)
    return res.data
})
const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state.userList.push(action.payload)
            })
            .addCase(viewUser.fulfilled, (state, action) => {
                state.userList = action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const id = action.payload
                console.log();

                const new_data = state.userList.filter((user) => {
                    return user.id !== id
                })
                state.userList = new_data
            })
            .addCase(edituser.fulfilled, (state, action) => {
                const { id } = action.payload
                console.log("id.............");
                console.log(id)
                const indexno = state.userList.findIndex((user) => {
                    return user.id == id
                })
                if (indexno != -1) {
                    state.userList[indexno] = action.payload
                }

            })
            .addCase(singleUser.fulfilled, (state, action) => {
                state.userList = action.payload
            })

    }
})

export default UserSlice.reducer