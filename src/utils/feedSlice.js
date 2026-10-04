import { createSlice } from "@reduxjs/toolkit"
const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed :(state,action)=>{
         return action.payload
        },
        removeFeed : (state,action) => {
            const newarray = state.filter(r=>r._id !== action.payload)
            return newarray
        }
    }
})

export const {addFeed,removeFeed} = feedSlice.actions
export default feedSlice.reducer