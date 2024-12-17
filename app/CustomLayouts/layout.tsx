import { html } from "framer-motion/client";

export default function CustomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>

                <div className="w-full flex flex-col">
                    <h1>This is belong to auth</h1>
                    {children}

                </div>
            </body>
        </html>




    );
}