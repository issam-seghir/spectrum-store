import "@/app/globals.css";
import { ThemeProvider } from "@/contexts/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Spectrum Store - Your One-Stop Shop",
    description:
        "Discover a spectrum of possibilities with our wide range of products. Spectrum Store, your one-stop shop for all your needs.",
    openGraph: {
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster />
                    {children}
                </ThemeProvider>
    );
}
