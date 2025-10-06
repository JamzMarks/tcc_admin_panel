import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/"]; 
const protectedPaths = ["/admin"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const accessToken = req.cookies.get("access_token")?.value;

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) && !accessToken) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname === "/" && accessToken) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"], 
};
