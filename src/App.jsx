import React, { useCallback, useMemo, useState } from 'react'
import EmployeeCard from './EmployeeCard';
const initialEmloyees =[
  {id:1, name:"Aman", department:"IT", image:"https://i.pravatar.cc/150?img=12"},
  {id:2, name:"Aanchal", department: "HR", image:"https://i.pravatar.cc/150?img=47"},
  {id:3, name:"Rahul", department: "IT", image:"https://i.pravatar.cc/150?img=13"},
  {id:4, name:"Neha", department:"IT", image:"https://i.pravatar.cc/150?img=44"},
  {id:5, name:"Simran", department:"HR", image:"https://i.pravatar.cc/150?img=45"}

];

const App = () => {
  const [employees, setEmployees] = useState(initialEmloyees);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [newName, setNewName] = useState("");
  const [newDepartment, setNewDepartment] = useState("IT");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDepartment, setEditDepartment] = useState("IT");
  const filteredEmployees = useMemo(()=>{
    return employees.filter((employee)=>{
      const matchesName = employee.name.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment = department === "All" || employee.department === department;

      return matchesName && matchesDepartment;
    });
  }, [employees, search, department]);
  const totalEmployees = employees.length;
  const itEmployees = employees.filter((employee)=> employee.department === "IT").length;
  const hrEmployees = employees.filter((employee)=> employee.department === "HR").length;

  const addEmployee =(event)=>{
    event.preventDefault();
    if(!newName.trim()){
      return;
    }
    const newEmployee = {
      id: Date.now(),
      name: newName.trim(),
      department: newDepartment,
      image: "http://i.pravatar.cc/150?img=20", 
    };
    setEmployees((previousEmployees)=>
    [
      ...previousEmployees, newEmployee
    ]);
    setNewName("");
    setNewDepartment("IT");
  };

  const updateEmployee = (event)=>{
    event.preventDefault();
    if(!editName.trim()){
      return;
    }
    setEmployees((previousEmployees)=> previousEmployees.map((employee)=>
    employee.id === editingId?{
      ...employee,
      name: editName.trim(),
      department: editDepartment,
    }
  :employee));
  setEditingId(null);
  setEditName("");
  setEditDepartment("IT");
  };
  const handleEdit = useCallback((employee)=>{
    setEditingId(employee.id);
    setEditName(employee.name);
    setEditDepartment(employee.department);
  }, []);
  const handleDelete = useCallback((id)=>{
    setEmployees((previousEmployees)=> previousEmployees.filter((employee)=> employee.id !==id));
  }, []);
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Employee Management Dashboard</h1>
      <form onSubmit={addEmployee} className='mb-6 rounded-xl border bg-white p-5 shadow-sm'>
        <h2 className='mb-4 text-xl font-bold'>Add New Employee</h2>
        <input type="text" placeholder='Enter employee name' value={newName} onChange={(event)=>
          setNewName(event.target.value)} className='mb-3 w-full rounded-lg border p-2' />
          <select value={newDepartment} onChange={(event)=>setNewDepartment(event.target.value)}
            className='mb-3 w-full rounded-lg border p-3'>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          <button type='submit' className='rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white'>Add Employee</button>
      </form>
      {editingId !== null && (
        <form onSubmit={updateEmployee} className='mb-6 rounded-xl border bg-white p-5'>
          <h2 className='mb-4 text-xl font-bold'>Edit Employee</h2>
          <input value={editName} onChange={(event)=> setEditName(event.target.value)} placeholder='Employee name'
          className='mb-3 w-full rounded-lg border p-2' />
          <select value={editDepartment} onChange={(event)=> setEditDepartment(event.target.value)}
            className='mb-3 w-full rounded-lg border p-2'>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
            <button type='submit' className='rounded-lg bg-green-600 px-5 py-3 text-white'>Save Changes</button>
            <button type='button' onClick={()=>setEditingId(null)} className='ml-3 rounded-lg bg-gray-500 
            px-5 py-3 text-white'>Cancel</button>
        </form>
      )}
      <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='rounded-xl bg-blue-100 p-5'>
          <p className='text-sm text-blue-700'>Total Employees</p>
          <h2 className='text-3xl font-bold text-blue-900'>{totalEmployees}</h2>
        </div>
        <div className='rounded-xl bg-green-100 p-5'>
          <p className='text-sm text-green-700'>IT Department</p>
          <h2 className='text-3xl font-bold text-green-900'>{itEmployees}</h2>
        </div>
        <div className='rounded-xl bg-purple-100 p-5'>
          <p className='text-sm text-purple-700'>HR Department</p>
          <h2 className='text-3xl font-bold text-purple-900'>{hrEmployees}</h2>
          
        </div>
      </div>
      <input type="text" placeholder='Search employee...' value={search} onChange={(event)=>
        setSearch(event.target.value)
      } className='mb-4 w-full rounded border bg-white p-2' />
      <select value={department} onChange={(event)=> setDepartment(event.target.value)}
        className='mb-4 w-full rounded-lg border bg-white p-3'>
          <option value="All">All Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>

        </select>
      <div className='space-y-3'>
        {filteredEmployees.map((employee)=>(
          <EmployeeCard key={employee.id} employee={employee} onEdit={handleEdit} onDelete={handleDelete}/>
        ))}
      </div>
      {filteredEmployees.length === 0 && (
        <p>No employee found</p>
      )}
      
    </div>
  )
}

export default App