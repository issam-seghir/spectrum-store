import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { ModeToggle } from "@/components/mode-toggler";
import { ShopCartDrawer } from "@/components/shop-cart-drawer";
import Search from "@/components/search";

export function Navbar() {
    return (
        <header className=" bg-background-secondary sticky top-0 z-30 flex w-full items-center justify-between gap-4 border-b px-4  py-4 sm:static sm:h-auto  sm:px-6">
            <h1 className="text-3xl font-bold">
                <Link href="/">Spectrum</Link>
            </h1>

            <div>
               <Search placeholder="Search ..." />
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <ShopCartDrawer />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <Image
                                src="https://i.imgur.com/LFpAx5i.png"
                                width={36}
                                height={36}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
