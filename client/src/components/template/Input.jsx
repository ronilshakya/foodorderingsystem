import React from 'react'



const Input = ({label,type,placeholder,id,spanError,onChange,value,accept,name}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className='flex justify-between'>
        <label htmlFor={id} className="form-text">{label}</label>
        <span className='text-red-600 text-sm font-semibold'>{spanError}</span>
      </div>
        <input 
            type={type} 
            placeholder={placeholder} 
            id={id} 
            name={name}
            value={value}
            accept={accept}
            style={{width:"30rem"}}
            className= {`border ${spanError ? 'border-red-600':'border-neutral-400'} ${spanError ? 'bg-red-100':'bg-white'}  p-2 rounded-md text-neutral-600 focus:border-orange-400 focus:outline-none`}
            onChange={onChange}
        />
    </div>
  )
}

export default Input