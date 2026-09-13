import {create} from 'zustand'

interface UsersState {
  data: any[]
  addUserZ: (user: any) => void
  deleteUserZ: (id: any) => void
  editUserZ: (user: any) => void
}

export const UsersZ = create((set) => ({
    data:[
  {id:1,job:'programing',age:20},
  {id:2,job:'dastavchik',age:21},
  {id:3,job:'furushanda',age:22},
  {id:4,job:'oshpaz',age:23},
  {id:5,job:'sartarosh',age:24},
  {id:6,job:'malim',age:40},
  {id:7,job:'ustoi moshin',age:10},
  {id:8,job:'hona furush',age:30},
  {id:9,job:'programing',age:12},
  {id:10,job:'dastavchik',age:18},
  {id:11,job:'furushanda',age:19},
  {id:12,job:'oshpaz',age:17},
    ],
    addUserZ:(newUser)=>set((state)=>({data:[...state.data,newUser]})),
    deleteUserZ:(id)=>set((state)=>({data: state.data.filter((e)=>e.id!==id)})),
    editUserZ:(user)=>set((state)=>({data: state.data.map((e)=>e.id===user.id ? user: e)})),
    getByIdZ:(id)=>set((state)=>({data: state.data.filter((e)=>e.id===id)})),
}))