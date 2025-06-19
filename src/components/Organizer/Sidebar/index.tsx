'use client'
import { AdjustmentsHorizontalIcon, BanknotesIcon, BuildingStorefrontIcon, CalendarIcon, CogIcon, DocumentChartBarIcon, HomeIcon, QrCodeIcon, ShoppingBagIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline'

import React from 'react'
import SidebarNav from '../Sidebar-nav'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
  setIsOpen: (input: boolean) => void
  isModelOpen: boolean,
  sidebarItems:any[]

}
const Sidebar = ({ setIsOpen, isModelOpen, sidebarItems }: Props) => {
  

  
  
  return (
    <AnimatePresence >
      {
        isModelOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className=' '
          >
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
          </motion.div>
        )
      }
    </AnimatePresence>

  )
}

export default Sidebar
