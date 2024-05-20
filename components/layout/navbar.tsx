import Link from "next/link";

import Search from "@/components/header/search";
import { ShopCartDrawer } from "@/components/header/shop-cart-drawer";
import UserAvatarOptions from "@/components/header/user-avatar-options";
import MobileMenu from "@/components/layout/mobile-navbar";
import { ModeToggle } from "@/components/header/mode-toggler";

export function Navbar() {

    return (
        <header className=" bg-background-secondary sticky top-0 z-30 flex w-full items-center justify-between gap-4 border-b px-4  py-4 sm:static sm:h-auto  sm:px-6">
            <MobileMenu />
            <h1 className="font-bold md:text-2xl lg:text-3xl">
                <Link href="/">Spectrum</Link>
            </h1>

            <div className="hidden md:block">
                <Search />
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <ShopCartDrawer />
                <UserAvatarOptions />
            </div>
        </header>
    );
}
