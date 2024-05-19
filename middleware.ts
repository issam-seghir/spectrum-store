import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedRoutes = ["/", "/products"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    console.log("im a middleware");

    // 3. Decrypt the session from the cookie
    const token = cookies().get("token")?.value;

    // 5. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // 6. Redirect to home page if the user is authenticated
    if (isPublicRoute && token && !req.nextUrl.pathname.startsWith("/")) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
