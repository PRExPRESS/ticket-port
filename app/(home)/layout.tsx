import type { Metadata } from "next";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "../globals.css";
import Provider from "../Providers/ThemeProvider";
import Topbar from "../components/Topbar";



import { Roboto, Fira_Sans,Playfair } from "next/font/google";
import Footer from "../components/Footer";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto",weight: ["100", "300", "400", "500", "700", "900"] });
const firaSans = Fira_Sans({ subsets: ["latin"], variable: "--font-fira-sans",weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const playfair = Playfair({ subsets: ["latin"], variable: "--font-playfair",weight: ["400", "500", "600", "700", "800", "900"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${firaSans.variable} ${playfair.variable} bg-[#FAFAFA] dark:bg-background-dark h-full w-full`}
      >
        <Provider>
          <div className="flex flex-col container h-full w-full">
            <Topbar />
          {children}
          </div>
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
