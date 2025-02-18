import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value;

  if (req.nextUrl.pathname.startsWith("/admin") && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
