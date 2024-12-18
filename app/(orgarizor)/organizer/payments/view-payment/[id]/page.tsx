'use client'
import Breadcrumb from '@/app/components/Breadcrumb'
import Button from '@/app/components/CustomBotton'
import React from 'react'


interface Props {
    code: string
    status: string
    amount: string
    date: string
    paymentId: string
    img: string
}
const page = () => {
    const [data, setData] = React.useState<Props>({ code: '', status: '', amount: '', date: '', paymentId: '', img: '' });
    const handleApprove = async () => {
        // const response = await approvePayment(+id);

        // if (response.error) {
        //   toastr.error(response.error.message,'',{
        //     positionClass: 'toast-top-right',
        //     closeButton: true,
        //     progressBar: true,
        //   });
        //   return;

        // }

        // if (response) {
        //   toastr.success('Payment approved successfully', '', {
        //     positionClass: 'toast-top-right',
        //     closeButton: true,
        //     progressBar: true,
        //   })
        //   setTimeout(() => {
        //     window.location.href = '/admin/payments';
        //   }, 2000);
        // }
    }
    return (
        <div className="">
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">View Payment</h1>
            <Breadcrumb items={[
                { title: 'Home', link: '#' },
                { title: 'Payments', link: '#' },
                { title: 'View Payment', link: '#' },
            ]} />
        <div className="w-full h-full flex flex-col md:flex-row md:justify-evenly gap-6 md:items-center">
            
            {/* Left Image */}
            <div className="w-full md:w-[400px] h-[400px] flex justify-center items-center">
                <img
                    src={data.img || '/imgs/sample-event.jpg'}
                    alt="Payment Image"
                    className="w-full h-full object-contain rounded-md shadow-md"
                />
            </div>

            {/* Right Payment Details */}
            <div className="flex flex-col justify-center items-center mt-6 md:mt-0 text-center md:text-left w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-3xl font-semibold text-text-light dark:text-text-dark mb-6">
                    Payment Details
                </h2>

                <div className="w-full flex flex-col gap-4 text-lg text-text-muted dark:text-text-dark">
                    <p className="font-medium">NIC: <span className="text-text-light dark:text-text-dark">{data.code}</span></p>
                    <p className="font-medium">Amount: <span className="text-primary dark:text-accent">LKR {data.amount}</span></p>
                    <p className="font-medium">Status: <span className={data.status === 'approved' ? 'text-success' : 'text-error'}>{data.status}</span></p>
                    <p className="font-medium">Date: <span className="text-text-light dark:text-text-dark">{data.date}</span></p>
                    <p className="font-medium">Payment ID: <span className="text-text-light dark:text-text-dark">{data.paymentId}</span></p>

                    {/* Conditional Status */}
                    {data.status === 'approved' ? (
                        <p className="text-success font-semibold">Payment status: Approved</p>
                    ) : (
                        <Button
                            label="Approve"
                            onClick={() => handleApprove()}
                            className="mt-4 px-6 py-2 text-white bg-primary hover:bg-buttonHover-light dark:hover:bg-buttonHover-dark rounded-md focus:outline-none"
                        />
                    )}
                </div>
            </div>
        </div>

        </div>
    )
}

export default page
