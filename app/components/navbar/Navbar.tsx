import React from 'react'
import NavItem from './NavItem'

const Navbar = () => {
    const nav=[
        {
            name:"Home",
            href:"/"
        },
        {
            name:"EDM",
            href:"/explore-events?category=edm"
        },
        {
            name:"Concerts",
            href:"/explore-events?category=concerts"
        },
        {
          name:"Theaters",
          href:"/explore-events?category=theaters"
      }
    ]
  return (
    <div className='hidden md:flex flex-row justify-between items-center w-2/12'>
      {
          nav.map((item)=><NavItem key={item.name} text={item.name} href={item.href}/>)
      }
    </div>
  )
}

export default Navbar
