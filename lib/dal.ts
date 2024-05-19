import "server-only";

import { logout } from "@/lib/actions";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
    const token = cookies().get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    return { isAuth: true, token };
});
