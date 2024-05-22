import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/services";
import {User} from "@/lib/types";
import { LogoutButton } from "./logout-button";
import { capitalizeFirstCharOfEveryWord } from "../../lib/utils";

export default async function UserAvatarOptions() {
    const user: User | null = await getCurrentUser();
console.log(user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full border-yellow-400"
                >
                    <Image
                        src={
                            user?.isAdmin
                                ? "/admin-avatar.png"
                                : "https://i.imgur.com/LFpAx5i.png"
                        }
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    {capitalizeFirstCharOfEveryWord(
                        user?.name?.firstname + " " + user?.name?.lastname,
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.isAdmin && (
                    <DropdownMenuItem className="cursor-pointer">
                        <Link href={"/admin"} passHref>
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
