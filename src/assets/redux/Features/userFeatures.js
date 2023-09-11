import { createSlice } from "@reduxjs/toolkit"

export const users = createSlice({
    name: "users",
    initialState: JSON.parse(localStorage.getItem("blackcat_user")) || {
        activeUser: false,
        name: "",
        email: "",
        imgUrl: "",
        id: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.displayName
            state.imgUrl = action.payload.photoURL
            state.email = action.payload.email
            state.id = action.payload.uid
            state.activeUser = true
            localStorage.setItem("blackcat_user", JSON.stringify(state))
        },
        updateUser: (state, action) => {
            state.name = action.payload.displayName
            localStorage.setItem("blackcat_user", JSON.stringify(state))
        },

        setImgUrl: (state, action) => {
            state.imgUrl = action.payload.photoURL
            localStorage.setItem("blackcat_user", JSON.stringify(state))
        },

        logOut: (state, action) => {
            state.name = ""
            state.imgUrl = ""
            state.email = ""
            state.id = ""
            state.activeUser = false
            localStorage.setItem("blackcat_user", JSON.stringify(state))
        },
    },
});

export const { setUser, logOut, updateUser, setImgUrl } = users.actions;
export default users.reducer;