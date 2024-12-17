import React from 'react'

interface Props {
    onChange: () => void
}

const SearchBar = ({onChange}: Props) => {
  return (
    <div className='flex flex-row items-center w-full h-[50px] bg-white/70 rounded-lg px-4 py-2'>
        <input type="text" 
        className='w-full bg-transparent outline-none placeholder:text-text-muted placeholder:font-roboto placeholder: font-light text-text-primary' 
        onChange={onChange} 
        placeholder='Search for an event...'
        />
        <button className='ml-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
      
    </div>
  )
}

export default SearchBar
