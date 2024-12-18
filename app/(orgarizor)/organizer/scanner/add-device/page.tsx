'use client';
import Breadcrumb from '@/app/components/Breadcrumb'
import Button from '@/app/components/CustomBotton'
import Input from '@/app/components/FormInput'
import SelectInput from '@/app/components/SelectInput'
import { userValidation } from '@/app/validations/user-validation'
import { EnvelopeIcon, LockClosedIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { redirect, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    type errorType = {
        fullName?: string,
        email?: string,
        password?: string,
        confirmPassword?: string,
        phone?: string
    };
    
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


        const errors = await userValidation(user);
        if (errors) {
            setErrors(errors);
            return
        }
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
    <div>
      <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Add Device</h1>
      <Breadcrumb items={[
        { title: 'Home', link: '#' },
        { title: 'Scanners', link: '/orgarnizer/scanner' },
        { title: 'Add Device', link: '#' },
      ]} />

<div className=" w-full md:w-1/2">
                    <Input
                        className='mt-4'
                        type="text"
                        label="Username"
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
                            className='w-full bg-accent text-text-light dark:text-text-dark dark:bg-accent'
                            loading={false}
                        />
                    </div>

                </div>
    </div>
  )
}

export default page
