'use client';
import React, { useState } from 'react';
import Button from '../../../components/CustomBotton';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import TicketCard from '@/app/components/TicketCard';
import CopyButton from '@/app/components/CopyButton';
import Header from '@/app/components/PageHeader';

const banks = [
    {
        "id": 1,

        "accountName": "N R T M Kumarasingha",
        "bankName": "BOC",
        "branch": "Malabe",
        "remark": "Use your user NIC as the reference",
        "accountNumber": "91123083"
    },
    {
        "id": 2,

        "accountName": "N R T M Kumarasingha",
        "bankName": "BOC",
        "branch": "Malabe",
        "remark": "Use your user NIC as the reference",
        "accountNumber": "91123083"
    },
]

const PaymentPage: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | null>(null);
    const [selectedBank, setSelectedBank] = useState<any>(null);
    const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
    });

    const userCode = "1234ABC";
    const amount = "1000";

    const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setPaymentSlip(e.target.files[0]);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const isCheckoutDisabled = paymentMethod === 'bank' && !paymentSlip;

    return (
        <div className="container mx-auto  pb-8 bg-background-light dark:bg-background-dark">
            <Header title="Checkout" subtitle="Make your payment" />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-[10%]">
                {/* Left Column: Payment Methods */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Select Payment Method</h2>

                    <div className="flex gap-4 mb-6">
                        <Button
                            label="Card Payment"
                            className={`w-1/2 py-2 px-4 text-center  ${paymentMethod === 'card' ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            onClick={() => setPaymentMethod('card')}
                        />
                        <Button
                            label="Bank Transfer"
                            className={`w-1/2 py-2 px-4 text-center  ${paymentMethod === 'bank' ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            onClick={() => setPaymentMethod('bank')}
                        />
                    </div>

                    {/* Card Payment Section */}
                    {paymentMethod === 'card' && (
                        <>
                            <input type="text" placeholder="Card Number" className="w-full mb-4 p-2 border rounded-lg" />
                            <div className="flex gap-4">
                                <input type="text" placeholder="Expiry Date" className="w-1/2 p-2 border rounded-lg" />
                                <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded-lg" />
                            </div>
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-6">Billing Information</h3>
                            <input name="name" placeholder="Full Name" className="w-full p-2 border rounded-lg mt-2" onChange={handleBillingChange} />
                            <input name="address" placeholder="Address" className="w-full p-2 border rounded-lg mt-2" onChange={handleBillingChange} />
                            <div className="flex gap-4 mt-2">
                                <input name="city" placeholder="City" className="w-1/2 p-2 border rounded-lg" onChange={handleBillingChange} />
                                <input name="zip" placeholder="ZIP Code" className="w-1/2 p-2 border rounded-lg" onChange={handleBillingChange} />
                            </div>
                        </>
                    )}

                    {/* Bank Transfer Section */}
                    {paymentMethod === 'bank' && (
                        <>
                            <p className="text-text-light dark:text-text-dark mb-4">Select Your Bank</p>
                            {/* Bank Selection */}

                            <div className="mt-6 grid grid-cols-1 gap-4">
                                {banks.map((bank, index) => (
                                    <TicketCard
                                        key={index}
                                        ticketType={bank.bankName}
                                        price={100} // Not relevant for price here
                                        selected={selectedBank === bank.id}
                                        onSelect={() => setSelectedBank(bank.id)}
                                    />
                                ))}
                            </div>
                            {selectedBank && (
                                <div className="mt-6 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg space-y-4">
                                    <div className="mt-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-700 dark:text-text-dark">Account Number: {banks[selectedBank - 1].accountNumber}</p>
                                            <CopyButton textToCopy={banks[selectedBank - 1].accountNumber} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-700 dark:text-text-dark">Account Name: {banks[selectedBank - 1].accountName}</p>
                                            <CopyButton textToCopy={banks[selectedBank - 1].accountName} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-700 dark:text-text-dark">Bank Name: {banks[selectedBank - 1].bankName}</p>
                                            <CopyButton textToCopy={banks[selectedBank - 1].bankName} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-700 dark:text-text-dark">Branch: {banks[selectedBank - 1].branch}</p>
                                            <CopyButton textToCopy={banks[selectedBank - 1].branch} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-700 dark:text-text-dark">Remark (User Code): {userCode}</p>
                                            <CopyButton textToCopy={userCode} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-700 dark:text-text-dark">Amount: {amount}</p>
                                            <CopyButton textToCopy={amount.toString()} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <label className="block mt-6 text-text-light dark:text-text-dark">Upload Payment Slip:</label>
                            <input type="file" onChange={handleFileChange} className="mt-2" />
                        </>
                    )}
                </div>

                {/* Right Column: Event Details & Summary */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg ">
                    <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Event Details</h2>
                    <p className="text-text-light dark:text-text-dark">Event: Tutorial on Canvas Painting</p>
                    <p className="text-text-light dark:text-text-dark">Date: 21st November 2024</p>
                    <p className="text-text-light dark:text-text-dark">Time: 04:00 PM</p>
                    <p className="text-text-light dark:text-text-dark mb-6">Location: Online</p>

                    <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">Summary</h2>
                    <p className="text-text-light dark:text-text-dark">Tickets: 2 Early Bird, 1 VIP</p>
                    <p className="text-xl font-bold mt-4 text-accent">Total: $300</p>
                    {/* Checkout Button */}
                    <div className="flex justify-center mt-8 w-full">
                        <Button
                            label="Checkout"
                            className={`py-3 px-6 w-full  ${isCheckoutDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary dark:bg-accent hover:bg-hoverEffects-gold text-white'
                                }`}
                            onClick={() => alert('Proceeding to checkout...')}
                            disabled={isCheckoutDisabled}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PaymentPage;
