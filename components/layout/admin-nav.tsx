"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/admin`,
            label: "Overview",
            active: pathname === `/admin`,
        },
        {
            href: `/admin/products`,
            label: "Products",
            active: pathname === `/admin/products`,
        },
        {
            href: ``,
            label: "Orders",
            active: pathname === `/admin/orders`,
            onClick: () =>
                toast("🛠 Orders page is currently under development."),
        },
        {
            href: ``,
            label: "Settings",
            active: pathname === `/admin/settings`,
            onClick: () =>
                toast("🛠 Settings page is currently under development."),
        },
    ];

    return (
        <nav
            className={cn(
                "flex flex-col items-center gap-8 sm:flex-row  sm:gap-0 sm:space-x-4 lg:space-x-6",
                className,
            )}
            {...props}
        >
            {routes.map((route, index) => (
                <Link
                    key={index}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground",
                    )}
                    onClick={route.onClick}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
