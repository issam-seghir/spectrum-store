import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//? this is a middleware function that will run on every request
//? it will check if the user is authenticated or not (authorization)
//? and redirect them to the appropriate page



// Admin role : represents the admin user id in the fakestoreapi db
const ADMIN_ROLE: number = 2;


// allowedOrigins for CORS
const allowedOrigins = [process.env.SITE_URL];

// CORS options
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
    "/admin/:path*", //  target all paths under /admin
];
const adminRoutes = ["/admin", "/admin/:path*"];
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

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const isAdminRoute = adminRoutes.includes(path);
    
    // 3. Decrypt the token from the cookie
    const token = cookies().get("token")?.value;
    let decoded: any = null;
    if (token) {
        decoded = jwt.decode(token);
    }

    // 5. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !decoded?.user) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // 6. Redirect to home page if the user is authenticated
    if (isPublicRoute && decoded?.user) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // 7. Redirect to home page if the user is not an admin
    const userId = Number(decoded?.sub);
    const isAdmin = userId === ADMIN_ROLE;

    if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
