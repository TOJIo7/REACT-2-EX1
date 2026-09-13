import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'users',
  initialState: {
    data:[
      { id: 1, name: "Ibrohim", phone: "+992072321653", status: false },
      { id: 2, name: "muhammad", phone: "+992172321654", status: true },
      { id: 3, name: "soleh", phone: "+992272321655", status: false },
      { id: 4, name: "maga", phone: "+992372321656", status: true },
      { id: 5, name: "sadi", phone: "+992472321657", status: false },
      { id: 6, name: "ahmad", phone: "+992572321658", status: true },
      { id: 7, name: "hasan", phone: "+992672321659", status: false },
      { id: 8, name: "abubakr", phone: "+992772321660", status: true },
      { id: 9, name: "abdullo", phone: "+992872321661", status: false },
      { id: 10, name: "sunnatullo", phone: "+992972321662", status: true },
      { id: 11, name: "Abdulloh", phone: "+99297232664", status: false },
      { id: 12, name: "maga", phone: "+99297232166", status: true },
    ],
    searchWord: "",
  },
  reducers:{
    deleteUser:(state, action) => {
        state.data = state.data.filter(user => user.id !== action.payload)
    },
    addUser:(state, action) => {
        state.data = [...state.data, action.payload]
    },
    editUser:(state, action) => {
        state.data = state.data.map(user => user.id === action.payload.id ? action.payload : user)
    },
    getByID:(state, action) => {
        state.data = state.data.filter(user => user.id === action.payload)
    }
  }
})


export const {deleteUser, addUser, editUser } = todoSlice.actions

export default todoSlice.reducer