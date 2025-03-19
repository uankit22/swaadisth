import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For a real app, you would check for an auth token in cookies
  // This is just a placeholder for demonstration purposes

  // Example of how you might check for authentication
  // const authToken = request.cookies.get("authToken")?.value

  // For now, we'll just redirect to login if the path is /profile
  if (request.nextUrl.pathname.startsWith("/profile")) {
    // In a real app, you would check if the user is authenticated here
    // For now, we'll just let the client-side handle the redirect
    return NextResponse.next()
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*"],
}

