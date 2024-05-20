import "server-only";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
    const token = cookies().get("token")?.value;
    const decoded = jwt.decode(token);

    if (!decoded?.user) {
        redirect("/login");
    }

    return { isAuth: true, token };
});
