'use client';
import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import ItemCard from '../../components/ItemCard';
import Header from '../../components/PageHeader';
import Filters from '../../components/Filter';
import { FunnelIcon } from '@heroicons/react/24/outline';
import Button from '../../components/CustomBotton';



interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

const EventExplorePage = () => {

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

  return (
    <div className="container mx-auto  mb-8">
      {/* Header */}
      <Header title="Discover Events For All The Things You Love" subtitle="Find and book tickets for your favorite events" />

      <div className="flex flex-col  gap-6">
        {/* Filters Section */}
        {/* <div className="w-full md:w-1/4">
        </div> */}
        {
          isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <Filters setIsOpen={setIsOpen} />
            </div>
          )
        }
        
        <div className="flex flex-row items-center gap-4 px-4">
            <Button
              label="Filters"
              onClick={() => setIsOpen(true)}
              icon={<FunnelIcon className="w-6 h-6" />}
              type="button"
              className='bg-primary text-white hover:bg-primary/80'
            />
        </div>

        {/* Event Cards Grid */}
        <div className="w-full flex flex-col items-center">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading events...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event) => (
                <ItemCard key={event.id} />
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
    </div>
  );
};

export default EventExplorePage;
