import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token")?.value;
  const path = req.nextUrl.pathname;

  const isLoginPage = path === "/admin/login";
  const isRecoverPasswordPage = path === "/admin/recover-password";

  // Permitir el acceso a /admin/login y /admin/recover-password sin token
  if (!adminToken && !isLoginPage && !isRecoverPasswordPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Redirigir a /admin si ya tiene sesión y está en /admin/login o /admin/recover-password
  if (adminToken && (isLoginPage || isRecoverPasswordPage)) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

// ✅ Aplicar el middleware solo a rutas bajo /admin
export const config = {
  matcher: ["/admin/:path*"],
};
