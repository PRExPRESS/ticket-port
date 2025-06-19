'use client'

import Breadcrumb from '@/app/components/Breadcrumb';
import Button from '@/app/components/CustomBotton';
import Input from '@/app/components/FormInput';
import Pagination from '@/app/components/Pagination';
import SelectInput from '@/app/components/SelectInput';
import Table from '@/app/components/Table';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import React, { use, useEffect, useMemo, useState } from 'react'






import toastr from 'toastr';


interface Users {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    company: string
}
const page = () => {

    const [userData, setUserData] = useState<Users[]>([]);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('10');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);

    const handleChange = (selectedOption: any) => {
        console.log('Option selected:', selectedOption);
        setLimit(selectedOption ? selectedOption : '');
    };

    const fetchUsers = async () => {
        //const response = await getAllUsers(currentPage.toString(), limit, searchTerm);

        // if (response.error) {
        //     toastr.error(response.error, '', {
        //         "closeButton": true,
        //         "debug": false,
        //         "newestOnTop": false,
        //         "progressBar": true,
        //         "positionClass": "toast-top-right",
        //         "preventDuplicates": false,
        //         "showEasing": "swing",
        //         "hideEasing": "linear",
        //         "showMethod": "fadeIn",
        //         "hideMethod": "fadeOut"
        //     });
        //     return;
        // }
        // if (Array.isArray(response.users)) {
        //     const refined = response.users.map((user: any) => {
        //         return {
        //             id: user.id,
        //             name: user.name,
        //             email: user.email,
        //             phone: user.phone,
        //             address: user.address,
        //             company: user.company.name,
        //         }
        //     });
        //     setUserData(refined);
        //     setTotalPages(response.totalPages);
        //     setCurrentPage(response.currentPage);

        // }

    }

    useEffect(() => {
        fetchUsers();
        console.log(currentPage, limit);
    }, [currentPage, limit, searchTerm]);

    // Search users
    // const filteredUsers = useMemo(() => {
    //     if (!search) {
    //         return userData; 
    //     }
    //     return userData.filter(user =>
    //         user.name.toLowerCase().includes(search.toLowerCase()) ||
    //         user.email.toLowerCase().includes(search.toLowerCase())
    //     );
    // }, [userData, search]);


    
    const headers = [
        {
            header: 'Name',
            key: 'name',
            sortType: 'string'

        },
        {
            header: 'Location',
            key: 'location',
            sortType: undefined
        },
        {
            header: 'Date',
            key: 'Date',
            sortType: undefined
        },
        {
            header: 'Organizer',
            key: 'organizer',
            sortType: undefined
        },
        {
            header: 'Revenue',
            key: 'revenue',
            sortType: undefined
        },
        {
            header: 'Status',
            key: 'status',
            sortType: 'string'
        }

    ]


    // Pagination
    //const totalPages = 3;
    

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        
    };

    const limits = [
        {
            label: '10',
            value: '10'
        },
        {
            label: '25',
            value: '25'
        },
        {
            label: '50',
            value: '50'
        },
        {
            label: '100',
            value: '100'
        },
    ]
    const FilterOptions = [
        { label: 'All', value: 'all' },
        { label: 'EDM', value: 'edm' },
        { label: 'Concert', value: 'concert' },
        { label: 'Theater', value: 'theater' },
    ];

    const handleCheckboxChange = (value: string) => {
        setSelectedFilters((prevFilters) => {
            if (value === 'all') return ['all'];
            if (prevFilters.includes(value)) {
                const updatedFilters = prevFilters.filter((item) => item !== value);
                return updatedFilters.length ? updatedFilters : ['all'];
            } else {
                const updatedFilters = [...prevFilters, value].filter((v) => v !== 'all');
                return updatedFilters;
            }
        });
    };
    return (
        <div className='flex flex-col justify-start items-start  min-h-[85vh] px-4 py-10 overflow-y-auto'>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Events</h1>
      <Breadcrumb items={[
        { title: 'Home', link: '#' },
        { title: 'Events', link: '#' },
      ]} />
            <div className='container mt-10 overflow-y-auto h-full flex flex-col items-start justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>

                <div className="flex  flex-col-reverse md:flex-row items-end md:items-center justify-between w-full mt-4">
                    <div className="flex flex-row items-center justify-end md:justify-start w-6/12 md:w-2/12">
                        <span className='text-sm text-text-light dark:text-text-dark'>Limit</span>
                        <SelectInput
                            options={limits}
                            label=''
                            onChange={handleChange}
                            value={limit}
                            className='w-1/2 ml-2'
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4  p-4 ">
                        {FilterOptions.map((option) => (
                            
                            <label
                                key={option.value}
                                className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(option.value)}
                                    onChange={() => handleCheckboxChange(option.value)}
                                    className="w-5 h-5 text-primary dark:text-secondary border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-accent"
                                />
                                <span
                                    className={`${selectedFilters.includes(option.value)
                                            ? 'text-blue-500 dark:text-blue-400 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {option.label}
                                </span>
                            </label>
                            
                            
                        ))}
                    </div>
                    <div className="flex flex-row items-center justify-end w-full md:w-3/12 mb-4 md:mt-1">
                        <Input
                            label=''
                            type='text'
                            placeholder='Search name or email ...'
                            className='w-1/3'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            
                        />
                        <Button
                            label=''
                            className='ml-2'
                            icon={<MagnifyingGlassIcon className='w-5 h-5 text-text-light dark:text-text-dark cursor-pointer hover:text-accent dark:hover:text-accent ' />}
                            onClick={() => setSearchTerm(search)}
                        />
                    </div>
                </div>
                <Table columns={headers as any} data={userData} />


            </div>
            <div className="w-full flex flex-row items-center justify-end mt-4">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    )
}

export default page
