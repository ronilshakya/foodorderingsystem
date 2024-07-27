import React from 'react'
import ReactDOM from 'react-dom'

const FoodDetailsModal = (props) => {
    const {closeModal,item} = props;
  return ReactDOM.createPortal(
    <div style={{zIndex: "100"}} className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg relative">
            <button onClick={()=>closeModal()} className="absolute top-2 right-2">X</button>
            <img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-60' alt="image" />
            <h1 className='text-md font-semibold tracking-tight text-gray-700'>{item.name}</h1>
            <p class="text-2xl font-semibold text-gray-800">Rs.{item.price}</p>
            <p class="text-2xl font-semibold text-gray-800">Description: {item.description}</p>
        </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default FoodDetailsModal