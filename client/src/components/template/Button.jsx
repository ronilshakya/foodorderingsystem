import React from 'react'

const Button = ({children,className, width, onClick}) => {
  return (
    <>
    <button 
        className={`${className} theme-main-color hover:theme-hover-color transition p-2 text-white font-semibold text-md rounded-md cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed`}
        style={width}
        onClick={onClick}
    >
        {children}
    </button>
    </>
  )
}

export default Button