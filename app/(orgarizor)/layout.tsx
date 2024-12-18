'use client';
import { Roboto, Fira_Sans, Playfair } from "next/font/google";
import "../globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Provider from "../Providers/ThemeProvider";
import Sidebar from "../components/Organizer/Sidebar";
import Topbar from "../components/Organizer/Topbar";
import Footer from "../components/Organizer/Footer";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";
import OpenChatButton from "../components/OpenChat";
import ChatBox from "../components/ChatBox";
import { BanknotesIcon, CalendarIcon, CogIcon, DocumentChartBarIcon, HomeIcon, QrCodeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";


const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["100", "300", "400", "500", "700", "900"] });
const firaSans = Fira_Sans({ subsets: ["latin"], variable: "--font-fira-sans", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const playfair = Playfair({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "500", "600", "700", "800", "900"] });

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isOpen, setIsOpen] = useState(true);
    const [isModelOpen, setIsModelOpen] = useState(true)
    const [isOpenChat, setIsOpenChat] = useState(false);
    useEffect(() => {
        if (isModelOpen) {
          setIsOpen(true)
        } else {
    
          setTimeout(() => {
            setIsOpen(false)
          }, 500)
        }
      }, [isModelOpen, setIsOpen]);

      const handleOpenChat = () => {
        setIsOpenChat(true);
        console.log("Chat opened!");
        // Replace this with logic to open the chat modal or redirect
      };
      const sidebarItems = [
        {
          title: "Dashboard",
          icon: <HomeIcon className="w-4 h-4 text-white" />,
          links: [
            {
              title: "Home",
              href: "/organizer",
            },
          ],
        },
        {
          title: "Events",
          icon: <CalendarIcon className="w-4 h-4 text-white" />,
          links: [
            {
              title: "Events",
              href: "/organizer/events/",
            },
            {
              title: "Create Event",
              href: "/organizer/events/create-event",
            },
          ],
        },
        {
          title: "Reports",
          icon: <DocumentChartBarIcon className="w-4 h-4 text-white" />,
          links: [
            {
              title: "Reports",
              href: "/organizer/reports",
            },
          ],
        },
        {
          title: "Scanner",
          icon: <QrCodeIcon className="w-4 h-4 text-white" />,
          links: [
            {
              title: "Scanner",
              href: "/organizer/scanner",
            },
            {
              title: "Add Device",
              href: "/organizer/scanner/add-device",
            },
          ],
        },
    
        {
          title: "Payments",
          icon: <BanknotesIcon className="w-4 h-4 text-white" />,
          links: [
            {
              title: "View Purchases",
              href: "/organizer/Payments",
            },
          ],
        },
        {
          title: "Purchases",
          icon: <ShoppingBagIcon className="w-4 h-4 text-white" />,
          links: [
            {
              title: "View Purchases",
              href: "/organizer/purchases",
            },
          ],
        },
        {
          title: "Settings",
          icon: <CogIcon className="w-4 h-4 text-white" />,
          links: [
            {
              title: "Profile",
              href: "/organizer/settings/profile",
            },
            {
              title: "Payments",
              href: "/organizer/settings/payments",
            },
            {
              title: "Edit Payment",
              href: "/organizer/settings/payments/edit-payment",
            },
          ],
        },
      ];
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${roboto.variable} ${firaSans.variable} ${playfair.variable} bg-[#FAFAFA] dark:bg-background-dark h-full w-full`}>
                <GoogleOAuthProvider
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
                >
                    <Provider>
                        <AuthProvider>

                            <div className="container h-full flex flex-row">
                                {
                                    isOpen && (
                                        
                                        <Sidebar sidebarItems={sidebarItems} setIsOpen={setIsOpen} isModelOpen={isModelOpen} />
                                    )
                                }
                                <div className="w-full flex flex-col">
                                    <Topbar isOpen={isOpen} setIsOpen={setIsOpen}  setIsOpenMobile={setIsModelOpen}/>
                                    <div className="w-full h-full p-4 min-h-[90vh]">
                                        {children}
                                    </div>
                                    <Footer />
                                </div>
                                <OpenChatButton onClick={handleOpenChat} />
                                {
                                    isOpenChat && (

                                        <ChatBox isOpen={isModelOpen} onClose={setIsOpenChat} />
                                    )
                                }
                            </div>
                        </AuthProvider>
                    </Provider>

                </GoogleOAuthProvider>
            </body>
        </html>





    );
}