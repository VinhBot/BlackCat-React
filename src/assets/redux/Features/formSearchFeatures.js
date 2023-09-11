import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import getHotKey from "../../Json/recommendkeyword.json";
import { tmdAPI } from "../../api.js";

export const fetchHotKey = createAsyncThunk("formSearch/fetchHotKey", async () => {
    return getHotKey.data;
});

export const fetchDataSearch = createAsyncThunk("formSearch/fetchDataSearch ", async (name) => {
    const response = await axios.get(tmdAPI.getHotSuggestionApi(name))
    return response.data.data.items
});

export const formSearch = createSlice({
    name: "formSearch",
    initialState: {
        entities: "",
        loading: false,
        entitiesNew: "",
        names: "",
    },
    reducers: {
        setName: (state, action) => {
            state.names = action.payload
        },

        setValueNew: (state, action) => {
            state.entitiesNew = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataSearch.fulfilled, (state, action) => {
            state.entitiesNew = action.payload
            state.loading = false
        })

        builder.addCase(fetchDataSearch.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchDataSearch.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(fetchHotKey.fulfilled, (state, action) => {
            state.entities = action.payload
            state.loading = false
        })
        builder.addCase(fetchHotKey.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchHotKey.rejected, (state, action) => {
            state.loading = false
        })
    },
});

export default formSearch.reducer;
export const { setName, setValueNew } = formSearch.actions;