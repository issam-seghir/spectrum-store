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
import {  ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export  function ShopCartDrawer() {

    return (
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
                <span className="absolute right-0 top-0 -mr-1 -mt-2 flex h-5 w-5 items-center justify-center rounded-full  bg-red-500 text-xs text-white">
                </span>
                <ShoppingBag />
            </SheetTrigger>
            <SheetContent
                className="flex flex-col justify-between overflow-auto"
                aria-controls="Tests"
            >
                <div>
                    <SheetHeader>
                        <SheetTitle>Shopping Cart</SheetTitle>
                        <SheetDescription>
                            You can pay with Stripe or PayPal
                        </SheetDescription>
                    </SheetHeader>
                </div>

                <div className="mt-4 flex w-full justify-between">
                    <h1 className="text-xl font-bold">Total</h1>
                    <h2 className="text-lg font-bold">
                        $0.00
                    </h2>
                </div>
            </SheetContent>
        </Sheet>
    );
}
