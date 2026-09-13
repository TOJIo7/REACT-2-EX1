import {create} from 'zustand'

export const UsersZ = create<any>((set: any) => ({
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
    addUserZ:(newUser: any)=>set((state: any)=>({data:[...state.data,newUser]})),
    deleteUserZ:(id: any)=>set((state: any)=>({data: state.data.filter((e: any)=>e.id!==id)})),
    editUserZ:(user: any)=>set((state: any)=>({data: state.data.map((e: any)=>e.id===user.id ? user: e)})),
    getByIdZ:(id: any)=>set((state: any)=>({data: state.data.filter((e: any)=>e.id===id)})),
}))