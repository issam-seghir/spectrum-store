import "@/app/globals.css";
import { AdminSidebar } from "@/components/admin-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Spectrum Store ....",
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
        <div className="flex h-screen w-full flex-col lg:flex-row">
            <AdminSidebar />
            <main className="flex-1 p-5">

                {children}
            </main>
        </div>
    );
}
