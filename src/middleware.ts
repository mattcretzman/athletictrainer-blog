import { NextRequest, NextResponse } from "next/server";

const BLOG_HOST = "blog.athletictrainerjob.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === BLOG_HOST && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/blog", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
