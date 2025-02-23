import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/app.config";

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const { nextUrl } = req;
  if (nextUrl.pathname.startsWith("/auth")) return NextResponse.next();
  if (!cookieStore.has(SESSION_COOKIE_NAME))
    return NextResponse.redirect(new URL("/auth/login", nextUrl.origin));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
