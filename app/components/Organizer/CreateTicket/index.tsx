'use client';
import React, { useState } from 'react';

import { Switch } from '@headlessui/react';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Input from '../../FormInput';
import Button from '../../CustomBotton';

const AddTicketModal = ({ onClose, onSave }: { onClose: (state: boolean) => void; onSave: () => void }) => {
    const [isTotalTicketsUnlimited, setTotalTicketsUnlimited] = useState(true);
    const [isMaxTicketsUnlimited, setMaxTicketsUnlimited] = useState(true);
    const [variations, setVariations] = useState([{ id: 1, price: '', name: '' }]);
    const [earlyBirdDiscount, setEarlyBirdDiscount] = useState(false);

    const addVariation = () => {
        setVariations([...variations, { id: Date.now(), price: '', name: '' }]);
    };

    const removeVariation = (id: number) => {
        setVariations(variations.filter((variation) => variation.id !== id));
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full  z-50 inset-0 flex items-center justify-center bg-black/50  ">
            <div className="w-full h-[85vh] max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto">
                {/* Header */}
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Create Single Ticket</h2>
                </div>

                {/* Content */}
                <div className="p-6 ">
                    {/* Ticket Name */}
                    <Input label="Ticket Name*" placeholder="Event Ticket Name" value="" onChange={() => { }} />

                    {/* Restrictions */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-text-light dark:text-text-dark">Ticket Restrictions</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Total number of tickets available</span>
                            <Switch
                                checked={isTotalTicketsUnlimited}
                                onChange={setTotalTicketsUnlimited}
                                className={`${isTotalTicketsUnlimited ? 'bg-accent' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">Enable total tickets</span>
                                <span
                                    className={`${isTotalTicketsUnlimited ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm">Maximum number of tickets for each customer</span>
                            <Switch
                                checked={isMaxTicketsUnlimited}
                                onChange={setMaxTicketsUnlimited}
                                className={`${isMaxTicketsUnlimited ? 'bg-accent' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">Enable max tickets</span>
                                <span
                                    className={`${isMaxTicketsUnlimited ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                    </div>

                    {/* Ticket Order */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Ticket Order*</label>
                        <select className="w-full border rounded p-2 focus:ring-2 focus:ring-accent">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>

                    {/* Ticket Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Ticket Description*</label>
                        <textarea
                            className="w-full border rounded p-2 focus:ring-2 focus:ring-accent"
                            rows={3}
                            placeholder="Description will go here"
                        />
                    </div>

                    {/* Variations */}
                    <div className="">
                        <h3 className="font-bold text-text-light dark:text-text-dark">Variations</h3>
                        {variations.map((variation) => (
                            <div key={variation.id} className="flex items-center gap-4">
                                <Input placeholder="Price" value={variation.price} onChange={() => { }} />
                                <Input placeholder="Variation Name" value={variation.name} onChange={() => { }} />
                                <button onClick={() => removeVariation(variation.id)} className="text-red-500 hover:text-red-600">
                                    <XCircleIcon className="w-6 h-6" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addVariation}
                            className="flex items-center gap-2 text-accent font-semibold hover:text-hoverEffects-gold"
                        >
                            <PlusCircleIcon className="w-5 h-5" /> Add Variation
                        </button>
                    </div>

                    {/* Early Bird Discount */}
                    <div className="w-full h-full">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">I want to offer early bird discount.</span>
                            <Switch
                                checked={earlyBirdDiscount}
                                onChange={setEarlyBirdDiscount}
                                className={`${earlyBirdDiscount ? 'bg-accent' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">Enable early bird discount</span>
                                <span
                                    className={`${earlyBirdDiscount ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform bg-white rounded-full`}
                                />
                            </Switch>
                        </div>
                        {earlyBirdDiscount && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Input placeholder="Discount" value="" onChange={() => { }} />
                                <select className="border rounded p-2 focus:ring-2 focus:ring-accent">
                                    <option>Percent(%)</option>
                                    <option>Fixed($)</option>
                                </select>
                                <Input type="date" placeholder="Discount Ends On" value="" onChange={() => { }} />
                                <Input type="time" placeholder="Time" value="" onChange={() => { }} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 p-4 border-t">
                    <Button label="Cancel" className="bg-gray-300 text-black" onClick={() => onClose(false)} />
                    <Button label="Save" className="bg-accent text-white hover:bg-hoverEffects-gold" onClick={onSave} />
                </div>
            </div>
        </div>
    );
};

export default AddTicketModal;
