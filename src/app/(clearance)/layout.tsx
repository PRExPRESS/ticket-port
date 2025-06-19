
import { Roboto, Fira_Sans,Playfair } from "next/font/google";
import "../globals.css";


const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto",weight: ["100", "300", "400", "500", "700", "900"] });
const firaSans = Fira_Sans({ subsets: ["latin"], variable: "--font-fira-sans",weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const playfair = Playfair({ subsets: ["latin"], variable: "--font-playfair",weight: ["400", "500", "600", "700", "800", "900"] });

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${roboto.variable} ${firaSans.variable} ${playfair.variable} bg-[#FAFAFA] dark:bg-background-dark h-full w-full`}>
                
                {children}
                
            </body>
        </html>
        




    );
}