'use client'

import { EnvelopeIcon, LockClosedIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'next/navigation'

import React, { useEffect } from 'react'


import toastr from 'toastr';
import { redirect } from 'next/navigation';
import Breadcrumb from '@/app/components/Breadcrumb';
import Input from '@/app/components/FormInput';
import Button from '@/app/components/CustomBotton';


type errorType = {
    fullName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    phone?: string
};

const page = () => {
    const [isAdmin, setIsAdmin] = React.useState(false);
    const searchParams = useSearchParams();
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    });

    const [errors, setErrors] = React.useState<errorType>({});
    useEffect(() => {
        if (searchParams.get('admin') === 'true') {
            setIsAdmin(true);
        }
    }, [searchParams]);
    const breadcrumb = [
        {
            title: 'Home',
            link: '/admin'
        },
        {
            title: 'Users',
            link: '/admin/users'
        },
        {
            title: 'Edit User',
            link: '/admin/edit-user/'
        }
    ];

    const handleSubmit = async () => {
        let user: any = formData;


        formData.password === '' ? user = { ...formData, password: '12345abc', confirmPassword: '12345abc', } : user = { ...formData };


        // const errors = await userValidation(user);
        // if (errors) {
        //     setErrors(errors);
        //     return
        // }
        toastr.success('User created successfully!', '', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        });
        setTimeout(() => {
            redirect('/admin/users');
        }, 2000);
    }
    return (
        <div className=''>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Edit Profile</h1>
            <Breadcrumb items={[
                { title: 'Home', link: '#' },
                { title: 'Settings', link: '#' },
                { title: 'Profile', link: '/orgarnizer/settings/profile' },
                { title: 'Edit Profile', link: '#' },
            ]} />
            <div className='flex flex-row items-center justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mt-10'>
                <div className=" w-full md:w-1/2 ">
                    <Input
                        className='mt-4'
                        type="text"
                        label="Name"
                        placeholder="John Doe"
                        name="name"
                        value={formData.fullName}
                        icon={<UserCircleIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        error={errors.fullName}
                    />

                    <Input
                        className='mt-4'
                        type="email"
                        label="Email"
                        placeholder="john@doe.com"
                        name="email"
                        value={formData.email}
                        icon={<EnvelopeIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                    />
                    <Input
                        className='mt-4'
                        type="text"
                        label="Phone Number"
                        placeholder="+1234567890"
                        name="phone"
                        value={formData.phone}
                        icon={<PhoneIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        error={errors.phone}
                    />
                    <Input
                        className='mt-4'
                        type="text"
                        label="Address"
                        placeholder="123 Main St, Anytown, USA"
                        name="address"
                        value={formData.address}
                        icon={<MapPinIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        error={errors.phone}
                    />

                    <Input
                        className='mt-4'
                        type="password"
                        label="Password"
                        placeholder="**********"
                        name="password"
                        value={formData.password}
                        icon={<LockClosedIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors?.password}
                    />
                    <Input
                        className='mt-4'
                        type="password"
                        label="Confirm Password"
                        placeholder="**********"
                        name="cpassword"
                        value={formData.confirmPassword}
                        icon={<LockClosedIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        error={errors?.confirmPassword}
                    />



                    <div className="flex items-center justify-center mt-4">
                        <Button
                            label="Save"
                            onClick={handleSubmit}
                            className='w-full bg-primary text-text-dark dark:text-text-dark dark:bg-accent hover:bg-hoverEffects-navy dark:hover:bg-hoverEffects-gold'
                            loading={false}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default page
