import React from 'react';
import { useState, useEffect } from 'react';;
import searchImg from '../img/magnifying-glass.png';
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems'


const Searchbar = () => {
    const [inputOpen, setInputOpen] = useState(false);
    const {foods} = useGetAllFoodItems();
    const [scrollTarget, setScrollTarget] = useState(null);

    // food categories to search
    const fooditems = foods.map(item => item.category).filter((item, index, arr) => 
        arr.indexOf(item) === index
    );
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

    useEffect(()=>{
        if(scrollTarget){
            const scrollOffset = 100; 
            const topPos = scrollTarget.getBoundingClientRect().top + window.scrollY - scrollOffset;
            window.scrollTo({ top: topPos, behavior: 'smooth' });
        }
    },[scrollTarget]);
    const scrollToElement = (id) =>{
        const element = document.getElementById(id);
        setScrollTarget(element);
        props.triggerSidebar();
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
                                    <li key={index} onClick={()=>scrollToElement(item)} className='border border-neutral-200 inline-block p-2 rounded-full cursor-pointer text-neutral-500 font-semibold hover:bg-neutral-200'>
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