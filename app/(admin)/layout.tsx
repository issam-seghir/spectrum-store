import "@/app/globals.css";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import type { Metadata } from "next";
import Link from "next/link";
import { MainNav } from "@/components/layout/admin-nav";
import { User } from "lucide-react";
import { Toaster } from "react-hot-toast";
// metadata

export const metadata: Metadata = {
    title: "Spectrum Store | Admin Dashboard",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Toaster />
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" />
                </div>
            </div>
            <div className="w-full">{children}</div>
        </>
    );
}
