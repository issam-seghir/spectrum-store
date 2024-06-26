"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
        },
        {
            href: ``,
            label: "Settings",
            active: pathname === `/admin/settings`,
        },
    ];

    return (
        <nav
            className={cn(
                "flex flex-col gap-8 sm:gap-0 items-center  sm:flex-row sm:space-x-4 lg:space-x-6",
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
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
