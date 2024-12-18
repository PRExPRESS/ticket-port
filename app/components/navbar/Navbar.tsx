import React from 'react'
import NavItem from './NavItem'

const Navbar = () => {
    const nav=[
        {
            name:"Home",
            href:"/"
        },
        {
            name:"About",
            href:"/about"
        },
        {
            name:"Contact",
            href:"/contact"
        }
    ]
  return (
    <div className='flex flex-row justify-between items-center w-2/12'>
      {
          nav.map((item)=><NavItem key={item.name} text={item.name} href={item.href}/>)
      }
    </div>
  )
}

export default Navbar
