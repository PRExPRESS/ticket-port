import Breadcrumb from '@/app/components/Breadcrumb'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Events</h1>
      <Breadcrumb items={[
        { title: 'Home', link: '#' },
        { title: 'Events', link: '#' },
        { title: 'View Event', link: '#' },
      ]} />
    </div>
  )
}

export default page
