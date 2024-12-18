'use client';
import React from 'react';

interface ProgressBarProps {
    step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
    const steps = ['Details', 'Tickets', 'Settings'];

    return (
        <div className="flex items-center justify-center my-6">
            {steps.map((label, index) => (
                <div key={index} className='flex flex-col '>

                    <div  className="flex items-baseline">
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${index <= step ? 'bg-accent text-white' : 'bg-gray-300 text-gray-500'
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <span className={` text-sm font-bold ${index <= step ? ' text-text-light dark:text-text-dark'  : ' text-gray-500'
                                    }`}>{label}</span>

                        </div>
                        <div className={`relative -left-2 text-sm font-semibold ${index === step ? 'text-accent' : 'text-gray-400'}`}>

                        </div>
                        {index < steps.length - 1 && <div className="w-16 h-1 bg-gray-300"></div>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
