'use client'

import { BanknotesIcon, CreditCardIcon, EnvelopeIcon, LockClosedIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline'
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
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Edit Payment Methods</h1>
            <Breadcrumb items={[
                { title: 'Home', link: '#' },
                { title: 'Settings', link: '#' },
                { title: 'Payments', link: '/orgarnizer/settings/payments' },
                { title: 'Edit Payment Methods', link: '#' },
            ]} />
            <div className='flex flex-row items-center justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 mt-10'>
                <div className=" w-full md:w-1/2 ">
                    <Input
                        className='mt-4'
                        type="text"
                        label="Bank Name"
                        placeholder="John Doe"
                        name="name"
                        value={formData.fullName}
                        icon={<UserCircleIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        error={errors.fullName}
                    />

                    <Input
                        className='mt-4'
                        type="number"
                        label="Account Number"
                        placeholder="1234567890"
                        
                        name="account-Number"
                        value={formData.email}
                        icon={<CreditCardIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                    />
                    <Input
                        className='mt-4'
                        type="text"
                        label="Branch Name"
                        placeholder="+1234567890"
                        name="text"
                        value={formData.phone}
                        icon={<BanknotesIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        error={errors.phone}
                    />
                    <Input
                        className='mt-4'
                        type="text"
                        label="Account Name"
                        placeholder="John Doe"
                        name="account-name"
                        value={formData.address}
                        icon={<UserCircleIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        error={errors.phone}
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
