"use client";

import Search from "@/components/header/search";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { MainNav } from "@/components/layout/admin-nav";

export default function AdminMobileMenu() {
    return (
        <div className="block sm:hidden">
            <Sheet>
                <SheetTrigger
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                            size: "icon",
                            className: "relative",
                        }),
                    )}
                >
                    <Menu />
                </SheetTrigger>
                <SheetContent
                    className="flex flex-col justify-between overflow-auto"
                    aria-controls="Tests"
                >
                    <div className="flex h-16 items-center justify-center">
                        <MainNav className="mx-6 h-16 sm:border-b" />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
