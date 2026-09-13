import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsersZ } from './zustand/storeZ'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteUser, addUser, editUser } from './storeR/todoSlice'
import './App.css'

import type { User } from './types'

function App() {
  const { data, addUserZ, deleteUserZ, editUserZ } = UsersZ((state) => state)
  const dispatch = useDispatch()
  const dataR = useSelector((state: { todo?: { data: User[] } }) => state.todo?.data)

  const [editId, setEditId] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState(false)
  const [age, setAge] = useState<string | number>("")
  const [job, setJob] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [open, setOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [sort, setSort] = useState("all")
  const [search, setSearch] = useState("")

  const handleEdit = (user: User) => {
    setEditId(user.id)
    setName(user.name || "")
    setPhone(user.phone || "")
    setJob(user.job || "")
    setAge(user.age || "")
    setStatus(user.status || false)
    setIsEditing(true)
    setOpen(true)
  }

  const handleAdd = () => {
    setIsEditing(false)
    setEditId(null)
    setName("")
    setPhone("")
    setJob("")
    setAge("")
    setStatus(false)
    setOpen(true)
  }

  const handleAddandEdit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && editId !== null) {
      editUserZ({ id: editId, job, age })
      dispatch(editUser({ id: editId, name, phone, status }))
    } else {
      const newUser = { id: Date.now(), job, age, name, phone, status }
      addUserZ(newUser)
      dispatch(addUser(newUser))
    }

    setName("")
    setPhone("")
    setJob("")
    setAge("")
    setStatus(false)
    setEditId(null)
    setIsEditing(false)
    setOpen(false)
  }

  const dataX = (data || []).map((e: User) => {
    const elr = (dataR || []).find((el: User) => el.id === e.id) || {}
    return { ...elr, ...e, id: e.id }
  })

  const filteredData = dataX.filter((e: User) => {
    const searchText = search.toLowerCase()
    const name = (e.name || "").toLowerCase()
    const phone = (e.phone || "").toLowerCase()
    const job = (e.job || "").toLowerCase()

    const searchResult =
      name.includes(searchText) ||
      phone.includes(searchText) ||
      job.includes(searchText)

    if (sort === "all") return searchResult
    if (sort === "true") return searchResult && e.status === true
    if (sort === "false") return searchResult && e.status === false
  })

  const handleDelete = (id: number) => {
    deleteUserZ(id)
    dispatch(deleteUser(id))
  }

  const handleInfo = (user: User) => {
    setSelectedUser(user)
    setInfoOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-6 flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Users</h1>
            <p className="text-sm text-slate-500">Manage your users</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-[250px]"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="all">All</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger >
                <Button onClick={handleAdd}>+ Add User</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleAddandEdit}>
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit user" : "Add user"}</DialogTitle>
                    <DialogDescription>
                      {isEditing
                        ? "Edit the user information and save your changes."
                        : "Fill in the information to add a new user."}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-5 py-6">
                    <div className="grid gap-2">
                      <Label>Name</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                    </div>

                    <div className="grid gap-2">
                      <Label>Phone</Label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" />
                    </div>

                    <div className="grid gap-2">
                      <Label>Job</Label>
                      <Input value={job} onChange={(e) => setJob(e.target.value)} placeholder="Enter job" />
                    </div>

                    <div className="grid gap-2">
                      <Label>Age</Label>
                      <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter age" />
                    </div>

                    <div className="grid gap-2">
                      <Label>Status</Label>
                      <select
                        value={status ? "true" : "false"}
                        onChange={(e) => setStatus(e.target.value === "true")}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="false">False</option>
                        <option value="true">True</option>
                      </select>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose >
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">{isEditing ? "Save changes" : "Add user"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr className="border-b">
                  <th className="px-6 py-4 text-left font-semibold text-slate-600">ID</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600">Phone</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600">Job</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600">Age</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((e: User, index: number) => (
                  <tr key={e.id ?? index} className="border-b transition hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-500">#{e.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{e.name}</td>
                    <td className="px-6 py-4 text-slate-600">{e.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{e.job}</td>
                    <td className="px-6 py-4 text-slate-600">{e.age}</td>

                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        e.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {e.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleInfo(e)}
                        >
                          Info
                        </Button>

                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleEdit(e)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(e.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              No users found
            </div>
          )}
        </div>

        <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Information</DialogTitle>
              <DialogDescription>
                Detailed information about this user.
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="divide-y rounded-lg border">
                <div className="flex justify-between px-4 py-3">
                  <span className="font-medium text-slate-500">ID</span>
                  <span>{selectedUser.id}</span>
                </div>

                <div className="flex justify-between px-4 py-3">
                  <span className="font-medium text-slate-500">Name</span>
                  <span>{selectedUser.name}</span>
                </div>

                <div className="flex justify-between px-4 py-3">
                  <span className="font-medium text-slate-500">Phone</span>
                  <span>{selectedUser.phone}</span>
                </div>

                <div className="flex justify-between px-4 py-3">
                  <span className="font-medium text-slate-500">Job</span>
                  <span>{selectedUser.job}</span>
                </div>

                <div className="flex justify-between px-4 py-3">
                  <span className="font-medium text-slate-500">Age</span>
                  <span>{selectedUser.age}</span>
                </div>

                <div className="flex justify-between px-4 py-3">
                  <span className="font-medium text-slate-500">Status</span>
                  <span className={selectedUser.status ? "text-green-600" : "text-red-600"}>
                    {selectedUser.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            )}

            <DialogFooter>
              <DialogClose >
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}

export default App