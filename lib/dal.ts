import "server-only";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

// Admin role : represents the admin user id in the fakestoreapi db
const ADMIN_ROLE : number = 2;

export const verifySession = cache(async () => {
    const token = cookies().get("token")?.value;
    const decoded = jwt.decode(token);
    console.log(decoded);

    // Redirect to login page if the user is not authenticated
    if (!decoded?.user) {
        redirect("/login");
    }

    const userId = Number(decoded?.sub);
    const isAdmin = userId === ADMIN_ROLE;
    // Redirect to home page if the user is not an admin
    if (isAdmin) {
        redirect("/");
    }

    return { isAuth: true, isAdmin, id: userId };
});
