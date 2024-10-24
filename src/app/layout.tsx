import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from "@/context/ToastContext";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import "@/styles/fonts.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "dreik",
    description: "Stop sitting on the sofa",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
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
