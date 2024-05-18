"use client";



import { buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Search from "@/components/search";

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
