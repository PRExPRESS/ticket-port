import { BuildingStorefrontIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline'

import React from 'react'
import SidebarNav from '../Sidebar-nav'

const Sidebar = () => {
    const sidebarItems = [
        {
            title: "Dashboard",
            icon: <HomeIcon className='w-4 h-4 text-white'/>,
            links: [
                {
                    title: "Home",
                    href: "/orgarnizer",
                }
            ],
        },
        {
            title: "Users",
            icon: <UsersIcon className='w-4 h-4 text-white'/>,
            links: [
                {
                    title: "Users",
                    href: "/admin/users",
                },
                {
                    title: "Create User",
                    href: "/admin/create-user",
                }
                
            ]
        },
        {
            title: "Companies",
            icon: <BuildingStorefrontIcon className='w-4 h-4 text-white'/>,
            links: [
                {
                    title: "Companies",
                    href: "/admin/companies",
                },
                {
                    title: "Create Company",
                    href: "/admin/create-company",
                }
                
            ]
        }
    ]
    return (
        <header className="hidden md:block sticky top-0 z-20 h-screen shrink-0 border-r dark:border-gray-200/10 bg-background-dark w-64 shadow">
            <div className="flex flex-col h-full w-full  ">
                <div className="flex flex-row items-center gap-2 pl-4 border-b border-gray-200/10 ">
                    <img src="/imgs/logo/logo.png" className='w-10 h-10 object-contain' alt="" />
                    <span className='text-2xl font-bold text-text-dark p-4   font-mono'> TicketPort</span>
                </div>
                <div className="flex flex-col ">
                    <SidebarNav sidebarItems={sidebarItems} />
                </div>
            </div>
        </header>
    )
}

export default Sidebar
