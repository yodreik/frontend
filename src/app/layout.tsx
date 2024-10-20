import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from "@/context/ToastContext";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import "@/styles/fonts.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "dreik",
    description: "Stop sitting on the sofa",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastProvider>
                    <AuthProvider>
                        <Header/>
                        <div className="content">
                            {children}
                        </div>
                        {/* <Footer/> */}
                    </AuthProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
