import React from 'react'

const InputDiv = ({handleChange,form,label,name}) => {
  return (
    <div className='mt-6'>
        <label htmlFor="businessName" 
            className='text-sm text-[#1A1619]'>
               {label}
        </label>
        <input
            type="text"
            name={name}
            id="businessName"
            className='w-full p-4 border border-gray-200 rounded-[5px] bg-[#FFFFFF] mt-3'
            placeholder="Enter your business name"
            onChange={handleChange}
            value={form.bussiness_name}
            required
            />
        </div>   
  )
}

export default InputDiv