'use client'
import Breadcrumb from '@/app/components/Breadcrumb';
import EventCard from '@/app/components/Organizer/ItemCard';
import ItemCard from '@/app/components/Organizer/ItemCard';
import Pagination from '@/app/components/Pagination';
import React, { useEffect, useState } from 'react'

interface EventData {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
  }
const page = () => {
    const eventsA = [
        {
          id: 1,
          name: 'Tech Conference 2024',
          location: 'New York City',
          date: '2024-07-01',
          totalTickets: 200,
          purchases: 150,
          status: 'Active',
        },
        {
          id: 2,
          name: 'Music Fest',
          location: 'Los Angeles',
          date: '2024-08-15',
          totalTickets: 1000,
          purchases: 300,
          status: 'Upcoming',
        },
        {
          id: 3,
          name: 'Art Exhibition',
          location: 'San Francisco',
          date: '2024-05-10',
          totalTickets: 100,
          purchases: 95,
          status: 'Ended',
        },
      ];
      
    const [events, setEvents] = useState<EventData[]>([]); // Event data
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [isLoading, setIsLoading] = useState(true);
      const [isOpen, setIsOpen] = useState(false);

      useEffect(() => {
          // Simulate fetching data (replace with actual API request)
          setIsLoading(true);
          setTimeout(() => {
            const mockEvents = Array.from({ length: 8 }, (_, index) => ({
              id: index + 1,
              title: `Event ${index + 1}`,
              date: '21st November 2024',
              time: '04:00 PM',
              location: 'Horizon Campus',
              image: '/imgs/sample-event.jpg',
            }));
            setEvents(mockEvents);
            setTotalPages(5); // Assume 5 total pages
            setIsLoading(false);
          }, 1000);
        }, [currentPage]);
        const handleEdit = (id: number) => {
            console.log(`Edit event with id: ${id}`);
          };
        
          const handleDelete = (id: number) => {
            console.log(`Delete event with id: ${id}`);
          };
    
  return (
    <div>
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Events</h1>
      <Breadcrumb items={[
        { title: 'Home', link: '#' },
        { title: 'Events', link: '#' },
      ]} />
      {/* Event Cards Grid */}
      <div className="w-full flex flex-col items-center mt-10">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading events...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {eventsA.map((event) => (
                <EventCard key={event.id}
                
                name={event.name}
                location={event.location}
                date={event.date}
                totalTickets={event.totalTickets}
                purchases={event.purchases}
                status={event.status}
                onEdit={() => handleEdit(event.id)}
                onDelete={() => handleDelete(event.id)}
                 />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
    </div>
  )
}

export default page
