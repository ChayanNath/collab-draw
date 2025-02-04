import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "./config";

const publicRoutes = ["/", "/signin", "/signup"];
const protectedRoutes = ["/dashboard", "/canvas", "/create-room", "/join-room"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // Check if route requires protection
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      // Verify token with your backend
      const res = await fetch(`${BACKEND_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      if (!res.ok) {
        // Token is invalid, redirect to signin
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    } catch (error) {
      // Error verifying token, redirect to signin
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // Handle authenticated users trying to access public routes
  if (publicRoutes.includes(pathname) && token) {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });

      if (res.ok && pathname !== "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (error) {
      // If token verification fails, let them access public routes
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/canvas/:path*", "/dashboard"],
};
