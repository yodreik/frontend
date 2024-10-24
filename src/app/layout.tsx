import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from "sonner";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import "@/styles/fonts.css";

import Success from "@/icons/success";

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
                <AuthProvider>
                    <Header />
                    <div className="content">
                        {children}
                        <Toaster richColors theme="dark" position="bottom-center" toastOptions={{
                            duration: 3000,
                            style: {
                                // Blurred transparent styles
                                // border: "1px solid var(--light-gray)",
                                borderRadius: "15px",
                                // fontSize: "16px",
                                // backdropFilter: "blur(15px)",
                                // backgroundColor: "rgba(24, 24, 27, 60%)",
                                // color: "var(--white)",
                            }
                        }} />
                    </div>
                    {/* <Footer/> */}
                </AuthProvider>
            </body>
        </html >
    );
}
