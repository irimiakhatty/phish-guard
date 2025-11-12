// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export async function middleware(request: NextRequest) {
  try {
    // If the request matches a protected route, ensure the user is signed in.
    if (isProtectedRoute(request)) {
      const session = await auth();
      // If there's no userId on the session, redirect to Clerk's sign-in page.
      if (!session || !session.userId) {
        const url = new URL("/sign-in", request.url);
        return NextResponse.redirect(url);
      }
    }
  } catch (err) {
    // On any error, avoid blocking the request — allow Next to handle it.
    // This keeps middleware resilient while we rely on Clerk for auth checks.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
