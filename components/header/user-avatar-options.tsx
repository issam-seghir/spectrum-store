"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserAvatarOptions() {
    return (
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
                <DropdownMenuItem className="cursor-pointer">
                    <Link href={"/admin"} passHref>
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => logout()}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
