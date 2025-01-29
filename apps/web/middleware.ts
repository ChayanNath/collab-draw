import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/signin", "/signup"];
const protectedRoutes = ["/dashboard", "/canvas", "/create-room", "/join-room"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  const isAuthenticated = Boolean(token);

  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAuthenticated && publicRoutes.includes(pathname) && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/canvas", "/dashboard"],
};
