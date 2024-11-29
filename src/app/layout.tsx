import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header/Header";
import "@/styles/globals.css";
import "@/styles/fonts.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "dreik",
    description: "Stop sitting on the sofa",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookieStore = await cookies();
    const theme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";

    return (
        <html lang="en">
            <body className={`${montserrat.className} ${theme}`}>
                <ThemeProvider>
                    <AuthProvider>
                        <Header />
                        <div className="content">
                            {children}
                            <Toaster
                                closeButton
                                richColors
                                theme="dark"
                                position="bottom-center"
                                toastOptions={{
                                    duration: 3000,
                                    style: {
                                        // Blurred transparent styles
                                        // border: "1px solid var(--light-gray)",
                                        borderRadius: "15px",
                                        // fontSize: "16px",
                                        // backdropFilter: "blur(15px)",
                                        // backgroundColor: "rgba(24, 24, 27, 60%)",
                                        // color: "var(--white)",
                                    },
                                }}
                            />
                        </div>
                        {/* <Footer/> */}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
