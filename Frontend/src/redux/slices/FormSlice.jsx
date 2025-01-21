import { createSlice } from "@reduxjs/toolkit";


const initialState = []

const formSlice = createSlice({
    name:"form",
    initialState:initialState,
    reducers:{
       addField:(state , action )=>{
             console.log(action.payload.fields)
             action.payload.fields.map((elem) => {
                 state.push(elem) 
             })
       }
    }
})

export const {addField} = formSlice.actions
export default formSlice.reducer