import { createSlice } from "@reduxjs/toolkit";
const requestSlice = createSlice({
    name : "requests",
    initialState : null,
    reducers : {
        addRequest : (state,action) =>{
            return action.payload
        },
        removeRequest : (state,action) => {
            const newarray = state.filter(r=>r._id !== action.payload)
            return newarray
        }
    }

})

export const {addRequest,removeRequest} = requestSlice.actions

export default requestSlice.reducer