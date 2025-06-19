'use client';
import React from 'react';
import SelectInput from '../SelectInput';
import Input from '../FormInput';
import Button from '../CustomBotton';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    setIsOpen: (input: boolean) => void

}

const Filters: React.FC<Props> = ({ setIsOpen }) => {

    const [isModelOpen, setIsModelOpen] = React.useState(true)

    React.useEffect(() => {
        if (isModelOpen) {
            setIsOpen(true)
        } else {

            setTimeout(() => {
                setIsOpen(false)
            }, 500)
        }
    }, [isModelOpen, setIsOpen]);
    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'concert', label: 'Concert' },
        { value: 'sports', label: 'Sports' },
        { value: 'workshop', label: 'Workshop' },
    ];

    return (
        <div className="space-y-6 fixed flex flex-row top-0 left-0 w-full bg-black/50 inset-0 h-full">
            <AnimatePresence >
                {
                    isModelOpen && (
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className='w-full md:w-4/12 h-full flex flex-row '
                        >
                            <div className="flex flex-col w-full p-4 bg-white dark:bg-gray-800  gap-6">
                                <h2 className="text-lg font-semibold text-primary dark:text-text-dark">Filters</h2>
                                {/* Category */}
                                <SelectInput options={categories} onChange={() => { }} placeholder="Select Category" />
                                {/* Date */}
                                <Input type="date" label="Event Date" value="" onChange={() => { }} />
                                {/* Location */}
                                <Input type="text" label="Location" placeholder="Enter location" value="" onChange={() => { }} />
                                {/* Price Range */}
                                <Input type="number" label="Min Price" value="" onChange={() => { }} placeholder="Min Price" />
                                <Input type="number" label="Max Price" value="" onChange={() => { }} placeholder="Max Price" />
                                <div className="flex flex-row items-center justify-between">
                                    <Button label="Reset" onClick={() => { }} className='bg-gray-400 text-white hover:bg-hoverEffects-gold' />
                                    <Button label="Apply" onClick={() => { }} className='bg-primary text-white hover:bg-hoverEffects-gold' />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center ml-10" onClick={() => setIsModelOpen(false)}>
                                <XCircleIcon className="w-10 h-10 inline-block cursor-pointer text-white hover:text-red-500" onClick={() => { }} />
                            </div>

                        </motion.div>

                    )
                }
            </AnimatePresence>
        </div>
    );
};

export default Filters;
