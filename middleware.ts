import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [process.env.SITE_URL];

const corsOptions = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 1. Specify protected and public routes
const protectedRoutes = [
    "/",
    "/products",
    "/products/:path*", //  target all paths under /products
    "/admin",
    "/admin/:path*", //  target all paths under /products
];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
    // Check the origin from the request
    const origin = req.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Handle preflighted requests
    const isPreflight = req.method === "OPTIONS";

    if (isPreflight) {
        const preflightHeaders = {
            ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
            ...corsOptions,
        };
        return NextResponse.json({}, { headers: preflightHeaders });
    }

    // Handle simple requests
    const response = NextResponse.next();

    if (isAllowedOrigin) {
        response.headers.set("Access-Control-Allow-Origin", origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    console.log(path);

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    console.log("im a middleware");

    // 3. Decrypt the session from the cookie
    const token = cookies().get("token")?.value;
    const decoded = jwt.decode(token);
    console.log(
        isPublicRoute &&
            !!decoded?.user &&
            !req.nextUrl.pathname.startsWith("/"),
    );

    // 5. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !decoded?.user) {
        console.log("im a reddirect in ProtectedRoute");

        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // 6. Redirect to home page if the user is authenticated
    if (isPublicRoute && decoded?.user) {
        console.log("im a reddirect in PublicRoute");
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
