import React from 'react';
import { useState } from 'react';;
import searchImg from '../img/magnifying-glass.png';

const fooditems = [
    'Pizza',
    'Burger',
    'Momo',
    'Chowmein',
    'Chicken',
    'Bakery',
    'Beverage'
]

const Searchbar = () => {
    const [inputOpen, setInputOpen] = useState(false);
    const triggerInputOpen = () =>{
        setInputOpen(!inputOpen);
    }
    // search filter
    const [searchRs , setSearchRs] = useState('');
    const [filteredItems , setFilteredItems] = useState([]);

    const searchResults = (e) =>{
        const searchTerm = e.target.value.trim();
        setSearchRs(searchTerm);
        const filtered = fooditems.filter(
            (item)=>
                item.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredItems(filtered);
   } 
  return (
    <div className='search-bar'>
                <div className={`flex items-center align-middle gap-1 px-2 theme-light-color max-lg:hidden ${inputOpen ? " rounded-t-md": " rounded-md" }`}>
                    <img src={searchImg} className="w-5" alt="search" />
                    <input 
                        type="text" 
                        className="w-96 px-4 py-3 bg-transparent text-white  placeholder:text-white focus:outline-none caret-white" 
                        placeholder="What do you want to eat today?"
                        onClick={triggerInputOpen}
                        onChange={searchResults}
                    />
                </div>
                    <div style={{width:"26.45rem"}} className={`${inputOpen ? "absolute bg-white w-96 px-4 py-3 shadow-lg rounded-b-md" : "hidden"}`}>
                        <h1 className='text-neutral-600 text-md font-semibold'>Search Something</h1>
                        <ul className='flex gap-2 mt-4'>
                            {searchRs && (
                                <div>
                                    {filteredItems.map((item,index)=>
                                    <li key={index} className='border border-neutral-200 inline-block p-2 rounded-full cursor-pointer text-neutral-500 font-semibold hover:bg-neutral-200'>
                                        {item}
                                    </li>)}
                                </div>
                            )}
                            
                        </ul>
                    </div>
            </div>
  )
}

export default Searchbar