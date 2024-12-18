
import { Roboto, Fira_Sans, Playfair } from "next/font/google";
import "../globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Provider from "../Providers/ThemeProvider";
import Sidebar from "../components/Organizer/Sidebar";
import Topbar from "../components/Organizer/Topbar";
import Footer from "../components/Organizer/Footer";
import { AuthProvider } from "../context/AuthContext";


const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["100", "300", "400", "500", "700", "900"] });
const firaSans = Fira_Sans({ subsets: ["latin"], variable: "--font-fira-sans", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const playfair = Playfair({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "500", "600", "700", "800", "900"] });

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${roboto.variable} ${firaSans.variable} ${playfair.variable} bg-[#FAFAFA] dark:bg-background-dark h-full w-full`}>
                <GoogleOAuthProvider
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
                >
                    <Provider>
                        <AuthProvider>

                            <div className="container h-full flex flex-row">
                                <Sidebar />
                                <div className="w-full flex flex-col">
                                    <Topbar />
                                    <div className="w-full h-full p-4 min-h-[90vh]">
                                        {children}
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                        </AuthProvider>
                    </Provider>

                </GoogleOAuthProvider>
            </body>
        </html>





    );
}