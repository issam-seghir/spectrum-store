import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/contexts/theme-provider";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// metadata for html head to improve SEO

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
                    <Navbar />
                    <main className="grid min-h-full w-full flex-1">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
    );
}
