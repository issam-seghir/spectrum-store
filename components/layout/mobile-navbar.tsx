"use client";



import Search from "@/components/header/search";
import { buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function MobileMenu() {


    return (
        <div className="block md:hidden">
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
                    <div>
                        <Search />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
