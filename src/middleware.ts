import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/qr/:id*"],
};

export async function middleware(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/qr/")[1];

  if (!id) return NextResponse.next();

  const trackRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (trackRes.status !== 200) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-link?id=${id}`);
  if (res.status === 403) {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  if (!res.ok) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  const { url } = await res.json();

  if (!url) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return NextResponse.redirect(url);
}