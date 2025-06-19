'use client';
import Breadcrumb from '@/app/components/Breadcrumb';
import Button from '@/app/components/CustomBotton';
import Input from '@/app/components/FormInput';
import React, { useState } from 'react';


interface BankDetail {
    id: number;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
}

const PaymentMethods: React.FC = () => {
    const [banks, setBanks] = useState<BankDetail[]>([]);
    const [formData, setFormData] = useState({
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Add Bank
    const handleAddBank = () => {
        if (formData.bankName && formData.accountNumber && formData.accountHolder) {
            const newBank = { id: Date.now(), ...formData };
            setBanks([...banks, newBank]);
            setFormData({ bankName: '', accountNumber: '', accountHolder: '' });
        }
    };

    // Handle Delete Bank
    const handleDeleteBank = (id: number) => {
        setBanks(banks.filter((bank) => bank.id !== id));
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 ">
            <div className="max-w-4xl ">
                <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Add Device</h1>
                <Breadcrumb items={[
                    { title: 'Home', link: '#' },
                    { title: 'Settings', link: '/orgarnizer/scanner' },
                    { title: 'Payments', link: '#' },
                ]} />

                {/* Add Bank Details Form */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-10 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                        Add Bank Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Bank Name"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            placeholder="Enter bank name"
                            required
                        />
                        <Input
                            label="Account Number"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            placeholder="Enter account number"
                            required
                        />
                        <Input
                            label="Account Holder"
                            name="accountHolder"
                            value={formData.accountHolder}
                            onChange={handleChange}
                            placeholder="Enter account holder name"
                            required
                        />
                    </div>

                    <Button
                        label="Add Bank"
                        className="mt-4 bg-primary dark:bg-accent  text-text-dark dark:text-text-dark hover:bg-hoverEffects-gold Dark:hover:bg-hoverEffects-gold"
                        onClick={handleAddBank}
                    />
                </div>

                {/* Display Added Banks */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                        Added Banks
                    </h2>
                    {banks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {banks.map((bank) => (
                                <div
                                    key={bank.id}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                            {bank.bankName}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <strong>Account Number:</strong> {bank.accountNumber}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <strong>Account Holder:</strong> {bank.accountHolder}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteBank(bank.id)}
                                        className="mt-4 text-red-500 hover:text-red-600 font-medium transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            No bank details added yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethods;
