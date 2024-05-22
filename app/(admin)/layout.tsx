import "@/app/globals.css";
import { MainNav } from "@/components/layout/admin-nav";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import BackButton  from "@/components/admin/back-button";

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
            <div className="flex w-full items-center px-8">
                <BackButton size={"sm"} route="/"/>
                <div className="flex-1">
                    <div className="flex h-16 items-center justify-center">
                            <MainNav className="mx-6 h-16 border-b" />
                    </div>
                </div>
            </div>
            <div className="w-full">{children}</div>
        </>
    );
}
