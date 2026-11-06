import React, { memo } from 'react'

const EmployeeCard = memo(function EmployeeCard({
    employee,
    onEdit,
    onDelete,
}){
    console.log("EmployeeCard rendered:", employee.name);
    
    return(
        <div className='flex items-center gap-4 rounded-lg border p-4'>
            <img src={employee.image} alt={employee.name} width="64" height="64" loading='lazy'
            className='h-16 w-16 rounded-full object-cover' />
            <div className='flex-1'>
                <h2 className='font-bold text-lg'>{employee.name}</h2>
                <p>Department: {employee.department}</p>
                <p className='text-sm text-green-600'>Active Employee</p>
                <button type='button' onClick={()=>onEdit(employee)}
                className='mt-3 rounded-lg bg-orange-500 px-4 py-2 text-white'>Edit</button>
                <button onClick={()=> onDelete(employee.id)} className='mt-3 ml-2 rounded-lg bg-red-600 px-4 py-2 text-white'>Delete</button>
            </div>
        </div>
    );
});

export default EmployeeCard