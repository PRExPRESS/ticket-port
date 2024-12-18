'use client'
import Breadcrumb from '@/app/components/Breadcrumb'
import { ArrowPathIcon, CheckCircleIcon, ClockIcon, CreditCardIcon, ExclamationTriangleIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef } from 'react'
import toastr from 'toastr'
import QrScanner from 'qr-scanner';
import Button from '@/app/components/CustomBotton'

interface camProps {
    id: string,
    label: string
}

interface User {
    id: number,
    tkt_id: number
    name: string
    nic: string
    status: string
}

const page = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [scanData, setScanData] = React.useState<string>('');
    const [scanError, setScanError] = React.useState<string>('');
    const [cameraList, setCameraList] = React.useState<camProps[]>([]);
    const [users, setUsers] = React.useState<User>({
        id: 0,
        name: '',
        nic: '',
        status: '',
        tkt_id: 0
    });
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [ticketStatus, setTicketStatus] = React.useState<any>({});
    const [selectedCamera, setSelectedCamera] = React.useState<camProps>({
        id: '',
        label: ''
    });

    const status = [
        {
            status: 'pending',
            icon: <ClockIcon className="w-5 h-5 text-yellow-500" />,
            color: 'bg-yellow-100 text-yellow-600'
        },
        {
            status: 'approved',
            icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
            color: 'bg-green-100 text-green-600'
        },
        {
            status: 'active',
            icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
            color: 'bg-green-100 text-green-600'
        },
        {
            status: 'verified',
            icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
            color: 'bg-green-100 text-green-600'
        },
        {
            status: 'deactivated',
            icon: <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />,
            color: 'bg-red-100 text-red-600'
        }

    ];

    const [updating, setUpdating] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const qrScannerRef = useRef<QrScanner | null>(null);


    // Initialize the scanner
    const initializeScanner = async () => {
        if (!videoRef.current) return;

        try {
            const qrScanner = new QrScanner(videoRef.current, (result) => {
                setScanData(result.data); // Capture scanned data

            }, {
                highlightScanRegion: true,
                highlightCodeOutline: true,
                maxScansPerSecond: 1,
            });

            qrScannerRef.current = qrScanner;

            // Fetch camera list and set default
            const cameras = await QrScanner.listCameras();
            setCameraList(cameras);
            if (cameras.length > 0) {
                setSelectedCamera(cameras[0]); // Default to the first camera
                await qrScanner.setCamera(cameras[0].id);
            }
            setTimeout(async () => {
                await qrScanner.start();
            }, 1000);
            //await qrScanner.start();
        } catch (error: any) {
            setScanError(error.message || 'Failed to initialize scanner');
        }
    };

    //select next camera
    const selectNextCamera = () => {
        if (cameraList.length < 0) {
            return
        }
        let index = 0;
        while (true) {
            index = (index + 1) % cameraList.length;
            if (cameraList[index].id === selectedCamera.id) {
                continue
            }
            handleCameraChange(cameraList[index]);
            break
        }


    };

    // Handle camera change
    const handleCameraChange = async (camera: camProps) => {
        console.log("selected cam:", camera.label)
        if (!qrScannerRef.current) {
            console.log("no scanner")
            return

        }
        const qrScanner = qrScannerRef.current;
        try {

            qrScanner?.stop();

            console.log('scan instance');

            await qrScanner?.setCamera(camera.id);
            setTimeout(async () => {
                await qrScanner?.start();
            }, 1000);

            //await qrScanner.start(); 
            return () => {
                if (qrScannerRef.current) {
                    qrScannerRef.current.stop(); // Destroy the scanner instance to release resources
                }
            };
        } catch (error: any) {
            setScanError(error.message || 'Failed to switch camera');
            console.error(error);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        initializeScanner();
        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.stop(); // Destroy the scanner instance to release resources
            }
        };
    }, []);

    // useEffect(() => {
    //   console.log("cam changed")
    //   handleCameraChange(selectedCamera);
    //   return () => {
    //     if (qrScannerRef.current) {
    //       qrScannerRef.current.stop(); // Destroy the scanner instance to release resources
    //     }
    //   };
    // }, [selectedCamera]);




    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            if (scanData == '' || scanData == undefined) {
                return;
            }
            const response:any =[] //await getPurchasesByScannerId(scanData);

            if (response.error) {
                toastr.error(response.error.message || 'An unknown error occurred', '', {
                    positionClass: 'toast-top-center',
                    progressBar: true
                });
                console.error(response.error.message);
                return;
            }
            setUsers({
                id: response.user_id,
                name: response.user.name,
                nic: response.user.code,
                status: response.status,
                tkt_id: response.id
            })
            const stat = status.find((s) => s.status === response.status) || {
                status: 'unknown',
                icon: <ExclamationTriangleIcon className="w-5 h-5 text-gray-500" />,
                color: 'bg-gray-100 text-gray-600'
            };
            setTicketStatus(stat);
            setIsOpen(true);
            console.log(response);
        }
        fetchData();
    }, [scanData]);

    //change camera


    //
    const handleStatus = async () => {
        const status = users.status;

        setScanData('');
        setUpdating('');
        setIsLoading(true);
        // switch (status) {
        //     case 'pending':
        //         const response = await updatePurchaseStatus(users.tkt_id, 'active');
        //         if (response) {
        //             setUpdating('Ticket activated!');
        //         }
        //         break;

        //     case 'active':
        //         const response2 = await updatePurchaseStatus(users.tkt_id, 'deactivated');
        //         if (response2) {
        //             setUpdating('Ticket verified!');
        //         }
        //         break;
        //     case 'verified':
        //         const response3 = await updatePurchaseStatus(users.tkt_id, 'deactivated');
        //         if (response3) {
        //             setUpdating('Ticket deactivated!');
        //         }
        //         break;

        //     case 'deactivated':
        //         setIsOpen(false);
        //         break;

        //     default:
        //         break;


        // }
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
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Scanner</h1>
            <Breadcrumb items={[
                { title: 'Home', link: '#' },
                { title: 'Events', link: '#' },
                { title: 'View Event', link: '#' },
            ]} />
            <div className="flex flex-col justify-center items-center md:w-1/2">
        {scanError && <p className="text-red-500">{scanError}</p>}
        {scanData && <p className="text-green-500">{scanData}</p>}
        <video ref={videoRef} className="w-full h-full" />

        <div className="mt-4">
          {/* change cam */}
          {
            cameraList.length > 0 &&(
              <>
                <button>
                  <ArrowPathIcon className="w-8 h-8 hover:text-secondary" onClick={selectNextCamera} />
                </button>
              </>
            )
          }
        </div>
      </div>
      {
        isOpen &&
        <div className="fixed bottom-0 left-0 right-0 inset-0 bg-black/50  flex flex-col justify-center items-center p-8 w-full h-full z-50">
          <div className="flex flex-col justify-center items-center bg-white rounded-lg p-4 w-full">
            <div className="flex flex-col justify-around items-start w-full mb-4">
              <span className="text-lg font-bold flex mt-2"><UserIcon className="w-8 h-8" /> <p className='ml-2'>Name: {users.name}</p></span>
              <span className="text-lg font-bold flex mt-2"><CreditCardIcon className="w-8 h-8" /><p className='ml-2 tracking-wide'> NIC: {users.nic}</p></span>
              <span className="text-lg font-bold flex mt-2">

                <span className={`text-lg font-bold flex mt-2 p-1 rounded-lg ${ticketStatus.color}`}>
                  {ticketStatus.icon}
                  <p className='ml-2'>Status: {ticketStatus.status}</p>
                </span>


              </span>

            </div>
            {!isLoading ? (

              <Button label="OK" onClick={() => { handleStatus() }} />
            ) : (
              <div className="flex flex-col justify-center items-center bg-white rounded-lg p-4 w-full">
                <p className="text-lg font-bold">{updating}</p>
                <img src={"/imgs/loading.gif"} alt="" className='w-12 h-12' />
              </div>
            )}
          </div>
        </div>
      }
        </div>
    )
}

export default page
