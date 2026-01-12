import { NextResponse } from "next/server";

export function middleware(req) {
  const unlockDate = new Date("2026-05-27T00:00:00+05:30");
  const now = new Date();

  const url = req.nextUrl.clone();

  // Allow static files & api
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg")
  ) {
    return NextResponse.next();
  }

  // 🔒 BEFORE DATE → force lock page
  if (now < unlockDate && url.pathname !== "/locked.html") {
    url.pathname = "/locked.html";
    return NextResponse.redirect(url);
  }

  // ✅ AFTER DATE → everything open forever
  return NextResponse.next();
}
