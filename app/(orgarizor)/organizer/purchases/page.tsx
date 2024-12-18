'use client';
import Breadcrumb from '@/app/components/Breadcrumb'
import Button from '@/app/components/CustomBotton'
import Input from '@/app/components/FormInput'
import Pagination from '@/app/components/Pagination'
import SelectInput from '@/app/components/SelectInput'
import Table from '@/app/components/Table'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'


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

    const handleChange = (selectedOption: any) => {
        console.log('Option selected:', selectedOption);
        setLimit(selectedOption ? selectedOption : '');
    };

  const breadcrumb = [
    {
      title: 'Home',
      link: '/admin'
    },
    {
      title: 'Users',
      link: '/admin/users'
    },

  ]
  const headers = [
    {
      header: 'Name',
      key: 'name',
      sortType: 'string'

    },
    {
      header: 'Email',
      key: 'email',
      sortType: undefined
    },
    {
      header: 'Phone',
      key: 'phone',
      sortType: undefined
    },
    {
      header: 'Address',
      key: 'address',
      sortType: undefined
    },
    {
      header: 'Company',
      key: 'company',
      sortType: undefined
    },

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
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Purchases</h1>
      <Breadcrumb items={[
        { title: 'Home', link: '#' },
        { title: 'Purchases', link: '#' },
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
