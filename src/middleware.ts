import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/"];
const protectedPaths = ["/admin"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  console.log("🔥 Middleware executado:", req.nextUrl.pathname);
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!accessToken) {
      if (refreshToken) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ad/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
              Cookie: `refresh_token=${refreshToken}`,
            },
          });
          if (res.ok) {
            const setCookie = res.headers.get("set-cookie");
            const response = NextResponse.next();

            if (setCookie) {
              response.headers.set("set-cookie", setCookie);
              console.log("✅ Novo access_token definido");
            }

            return response;
          } else {
            console.error("❌ Refresh falhou:", res.status);
          }
        } catch (err) {
          console.error("Erro ao tentar renovar token:", err);
        }
      }

      url.pathname = "/";
      return NextResponse.redirect(url);
    }
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
