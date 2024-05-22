"use client";

import { logout } from "@/lib/actions";

import {
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LogoutButton() {

    return (
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            Logout
        </DropdownMenuItem>
    );
}
