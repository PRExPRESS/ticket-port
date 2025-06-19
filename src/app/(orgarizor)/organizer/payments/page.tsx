'use client';
import Breadcrumb from '@/app/components/Breadcrumb'
import Button from '@/app/components/CustomBotton'
import Input from '@/app/components/FormInput'
import Table from '@/app/components/Organizer/Table';
import Pagination from '@/app/components/Pagination'
import SelectInput from '@/app/components/SelectInput'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'


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
    const [selectedBankFilters, setSelectedBankFilters] = useState<string[]>(['all']);

    const handleChange = (selectedOption: any) => {
        console.log('Option selected:', selectedOption);
        setLimit(selectedOption ? selectedOption : '');
    };

    useEffect(()=>{
        console.log(selectedFilters);
    },[selectedFilters])




    const headers = [
        {
            header: 'NIC',
            key: 'nic',
            sortType: 'string'

        },
        {
            header: 'Amount',
            key: 'Amount',
            sortType: undefined
        },
        {
            header: 'Status',
            key: 'phone',
            sortType: undefined
        },
        {
            header: 'Created At',
            key: 'created_at',
            sortType: undefined
        },


    ]

    const FilterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Online Payments', value: 'online' },
        { label: 'Bank Transfer', value: 'bank' },
    ];
    const bankFilterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Paid', value: 'paid' },
        { label: 'Pending', value: 'pending' },
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
    const handleCheckboxChangeBank = (value: string) => {
        setSelectedBankFilters((prevFilters) => {
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
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Payments</h1>
            <Breadcrumb items={[
                { title: 'Home', link: '#' },
                { title: 'Payments', link: '#' },
            ]} />

            <div className='container overflow-y-auto h-full flex flex-col items-start justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mt-10'>

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
                {
                    selectedFilters.includes('bank') && (
                        <div className="flex flex-wrap items-center gap-4  p-4 ">
                        {bankFilterOptions.map((option) => (
                            
                            <label
                                key={option.value}
                                className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedBankFilters.includes(option.value)}
                                    onChange={() => handleCheckboxChangeBank(option.value)}
                                    className="w-5 h-5 text-primary dark:text-secondary border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-accent"
                                />
                                <span
                                    className={`${selectedBankFilters.includes(option.value)
                                            ? 'text-blue-500 dark:text-blue-400 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {option.label}
                                </span>
                            </label>
                            
                            
                        ))}
                    </div>
                    )
                }
                <div className="flex  flex-col-reverse md:flex-row items-end md:items-center justify-between w-full mt-4"></div>
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
