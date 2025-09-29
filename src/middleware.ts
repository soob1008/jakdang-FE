import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 지금은 단순히 그대로 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
