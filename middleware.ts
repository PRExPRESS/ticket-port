import { NextRequest, NextResponse } from "next/server";

// Define the User type (adjust according to your needs)
interface User {
  id: string;
  // Add other user properties as needed
}

export default function middleware(req: NextRequest) {
  // const protectedRoutes = ["/admin", "/organizer"];
  // const sessionToken = req.cookies.get("sessionToken"); // Use cookies instead of localStorage
  // const expiry = req.cookies.get("expiry") ? parseInt(req.cookies.get("expiry")!) : 0;
  // const currentTime = Math.floor(Date.now() / 1000);

  // console.log("Protected route:", req.nextUrl.pathname);

  // if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
  //   // Simulate user authentication (replace with actual logic, e.g., JWT verification)
  //   const user: User | null = sessionToken ? { id: sessionToken } : null;

  //   if (!user || currentTime > expiry) {
  //     // Clear cookies if expired or no user
  //     const response = NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  //     response.cookies.delete("sessionToken");
  //     response.cookies.delete("expiry");
  //     return response;
  //   }
  // }
  console.log("Protected route:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/organizer/:path*"], // Match specific protected routes
};