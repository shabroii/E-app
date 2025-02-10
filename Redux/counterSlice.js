import { createSlice } from "@reduxjs/toolkit";


const counterSlice= createSlice({
    name:'counter',
    initialState:{
     counter:0,
     name:'Mohamed'
    },

    reducers:{
        
    }
})

export const counterReducer = counterSlice.reducer