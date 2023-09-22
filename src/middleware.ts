import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicpath = path === "/login" || path === "/signup";

  //   extract token
  //   ? optional chaning   
  const token = request.cookies.get("token")?.value || "";

  //based on variable we should access path
  if (isPublicpath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicpath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
