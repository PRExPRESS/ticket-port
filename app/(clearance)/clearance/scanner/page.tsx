'use client'

import Button from '@/app/components/CustomBotton';
import { CalendarIcon, ClockIcon, CreditCardIcon, MapIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { q } from 'framer-motion/client';
import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react'

interface camProps {
    id: string;
    label: string;
}

interface User {
    id: number,
    tkt_id: number
    name: string
    nic: string
    status: string
}

const page = () => {
    const [isOnline, setIsOnline] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null); // Ref for the video element
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [cameraFacingMode, setCameraFacingMode] = useState<'environment' | 'user'>('environment');
    const [error, setError] = useState<string | null>(null);
    const qrScannerRef = useRef<QrScanner | null>(null);
    const [cameraList, setCameraList] = useState<camProps[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<camProps>({
        id: '',
        label: ''
    });
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const [users, setUsers] = React.useState<User>({
        id: 0,
        name: '',
        nic: '',
        status: '',
        tkt_id: 0
    });
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [updating, setUpdating] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    useEffect(()=>{
        window.addEventListener('online', () => {
            setIsOnline(true);
        });
        window.addEventListener('offline', () => {
            setIsOnline(false);
        });
    },[])

    const handleStatus = async () => {
        const status = users.status;

        // setScanData('');
        setUpdating('');
        setIsLoading(true);
        switch (status) {
            case 'pending':
                //const response = await updatePurchaseStatus(users.tkt_id, 'active');
                // if (response) {
                //   setUpdating('Ticket activated!');
                // }
                break;

            case 'active':
                //const response2 = await updatePurchaseStatus(users.tkt_id, 'deactivated');
                // if (response2) {
                //   setUpdating('Ticket verified!');
                // }
                break;
            case 'verified':
                //const response3 = await updatePurchaseStatus(users.tkt_id, 'deactivated');
                // if (response3) {
                //   setUpdating('Ticket deactivated!');
                // }
                break;

            case 'deactivated':
                setIsOpen(false);
                break;

            default:
                break;


        }
    }

    useEffect(() => {
        if (updating != '') {

            setIsLoading(false);
            setUpdating('');
            setIsOpen(false);
            toastr.success(updating, '', {
                closeButton: true,
                progressBar: true,
                positionClass: 'toast-top-right',
            });

        }
    }, [updating]);

    useEffect(() => {
        // Function to get the formatted time
        const updateTime = () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTime(formattedTime);
        };
        const dateObj = new Date();

        // Format date as YYYY-MM-DD or any format you prefer
        const date = dateObj.toLocaleDateString('en-US', {
            weekday: 'short', // e.g., Monday
            year: 'numeric',
            month: 'short', // Full month name
            day: 'numeric',
        });

        setDate(date);

        // Call updateTime initially to prevent 1-sec delay
        updateTime();

        // Set an interval to update time every second
        const intervalId = setInterval(updateTime, 1000);

        // Cleanup the interval on unmount
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        // Initialize the video element
        const initializeVideo = async () => {

            if (videoRef.current) {
                // Initialize the QR Scanner
                qrScannerRef.current = new QrScanner(
                    videoRef.current,
                    (result) => {
                        setScanResult(result.data); // Set scanned result
                        setIsOpen(true);
                    },
                    {
                        highlightScanRegion: true,
                        highlightCodeOutline: true,
                    }
                );

                try {
                    const cameras = await QrScanner.listCameras();
                    setCameraList(cameras);

                    console.log(cameras);
                    if (selectedCamera.id === '') {
                        setSelectedCamera(cameras[0]);
                    } else {
                        console.log('selected cam:', selectedCamera.label);
                        qrScannerRef.current.setCamera(selectedCamera.id);

                    }

                    setTimeout(async () => {
                        if (qrScannerRef?.current)
                            await qrScannerRef?.current.start();

                    }, 1000);


                } catch (error: any) {
                    setError(error.message);
                }


            }
        }
        initializeVideo();
        // Clean up on unmount
        return () => {
            qrScannerRef.current?.stop();
        };
    }, [selectedCamera]);

    // Function to toggle the camera
    const toggleCamera = () => {
        if (cameraList.length < 0) {
            return
        }
        let index = 0;
        while (true) {
            index = (index + 1) % cameraList.length;
            if (cameraList[index].id === selectedCamera.id) {
                continue
            }
            setSelectedCamera(cameraList[index]);
            console.log('selected cam:', cameraList[index]);
            break
        }
        qrScannerRef.current?.stop();
    };

    return (
        <div className='w-full min-h-screen  '>
            <div className="flex items-center justify-between border-b border-gray-400 px-[10%] py-4">
                <div className='flex flex-row items-center gap-2'>
                    <img src="/imgs/logo/logo.png" alt="" className='w-10 h-10 object-contain' />
                    <span className='text-xl font-bold uppercase font-playfair'>Ticketport</span>
                </div>
                <span className={`${isOnline ? "text-green-500" : "text-red-500"} font-bold`}>
                    {isOnline ? "Online" : "Offline"}
                </span>
            </div>
            <div className="flex flex-col items-center justify-center ">
                <span className='text-3xl font-bold text-primary mt-4 text-center font-fira '>Gate Scanner</span>
            </div>
            <div className="flex items-center gap-2 px-[10%]">
                <CalendarIcon className="w-6 h-6 text-gray-500" />
                <span className="text-lg font-bold text-gray-500 ">{date}</span>
            </div>
            <div className="flex items-center gap-2 px-[10%]">
                <ClockIcon className="w-6 h-6 text-gray-500" />
                <span className="text-lg font-bold text-gray-500 ">{time}</span>
            </div>

            <div className="w-full h-full px-[10%]">
                {/* Video Element */}
                <div className="w-full h-full mt-4">
                    <video
                        ref={videoRef}
                        className="w-full h-full aspect-square object-cover rounded-lg border border-gray-200"

                    ></video>
                </div>


                {/* Toggle Camera Button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={toggleCamera}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                    >
                        Switch to {cameraFacingMode === 'environment' ? 'Front Camera' : 'Back Camera'}
                    </button>
                </div>

                <div className="mt-[20px] flex flex-col items-center">
                    <span className="text-3xl font-bold text-primary mt-[50px]">Sambathra </span>
                    <div className="flex flex-row items-start gap-2 ">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-6 h-6 text-gray-500" />
                            <span className='text-lg font-bold text-gray-500 '>Enigma</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-6 h-6 text-gray-500" />
                            <span className="text-lg font-bold text-gray-500 ">Horizon</span>
                        </div>
                    </div>

                </div>

                {/* Scanned Result */}
                {isOpen && (
                    <div className="fixed bottom-0 left-0 right-0 inset-0 bg-black/50  flex flex-col justify-center items-center p-8 w-full h-full z-50">
                        <div className="flex flex-col justify-center items-center bg-white rounded-lg p-4 w-full">
                            <div className="flex flex-col justify-around items-start w-full mb-4">
                                <span className="text-lg font-bold flex mt-2"><UserIcon className="w-8 h-8" /> <p className='ml-2'>Name: {users.name}</p></span>
                                <span className="text-lg font-bold flex mt-2"><CreditCardIcon className="w-8 h-8" /><p className='ml-2 tracking-wide'> NIC: {users.nic}</p></span>
                                <span className="text-lg font-bold flex mt-2">

                                    {/* <span className={`text-lg font-bold flex mt-2 p-1 rounded-lg ${ticketStatus.color}`}>
                                    {ticketStatus.icon}
                                    <p className='ml-2'>Status: {ticketStatus.status}</p>
                                </span> */}


                                </span>

                            </div>
                            {!isLoading ? (

                                <Button label="OK" onClick={() => { handleStatus() }} />
                            ) : (
                                <div className="flex flex-col justify-center items-center bg-white rounded-lg p-4 w-full">
                                    <p className="text-lg font-bold">{updating}</p>
                                    <img src={loading} alt="" className='w-12 h-12' />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="mt-4 p-2 bg-red-100 border border-red-300 rounded">
                        <p className="text-red-700 font-medium">Error:</p>
                        <p className="text-gray-800">{error}</p>
                    </div>
                )}

            </div>

        </div>
    )
}

export default page
