import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/contexts/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Spectrum Store - Your One-Stop Shop",
    description:
        "Discover a spectrum of possibilities with our wide range of products. Spectrum Store, your one-stop shop for all your needs.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${inter.variable} m-0 box-border flex min-h-screen flex-col items-center overflow-x-hidden p-0  font-sans outline-none`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main className="grid min-h-full w-full flex-1">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
