import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const getUrlBasedOnRole = (role: string) => {
  switch (role) {
    case "student":
      return "/student";
    case "warden":
      return "/warden";
    case "worker":
      return "/worker";
    case "superadmin":
      return "/superadmin";
    default:
      return "/dashboard";
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const role = req.cookies.get("role")?.value;

  const { pathname } = req.nextUrl;
  const publicRoutes = ["/login", "/signup"];
  const availableRoles = ["student", "warden", "worker", "superadmin"];
  const isPublic = publicRoutes.includes(pathname);

  const isAuthenticated = accessToken || refreshToken;
  console.log("Proxy Middleware:", {
    pathname,
    isAuthenticated,
    isPublic,
    role,
  });

  //if user is not authenticated and trying to access protected route, redirect to login
  // if user is not authenticated and on login/signup page then let it be

  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // if user is authenticated and trying to access login/signup page, redirect to respective dashboard

  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(
      new URL(getUrlBasedOnRole(role || ""), req.url)
    );
  }

  if(isAuthenticated){
    if(!(pathname.includes(role || ""))){
      return NextResponse.redirect(
        new URL(getUrlBasedOnRole(role || ""), req.url)
      );
    }
  }

  if (!accessToken && refreshToken && !isPublic) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/refresh",
        {
          method: "POST",
          headers: {
            cookie: req.headers.get("cookie") || "",
          },
        }
      );
      console.log("Refresh token response:", response);

      if (response.ok) {
        const data = await response.json();

        const res = NextResponse.next();

        res.cookies.set("accessToken", data.data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 15 * 60, 
        });

        console.log("Token refreshed successfully",response);
        return res;
      } else {
        console.log("Failed to refresh token");
        const res= NextResponse.redirect(new URL("/login", req.url));
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        res.cookies.delete("role");
        return res;
        // return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch {
      console.log("Refresh token invalid or expired");
      const res= NextResponse.redirect(new URL("/login", req.url));
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        res.cookies.delete("role");
        return res;
      // return NextResponse.redirect(new URL("/login", req.url));
    }
  }


  


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/student/:path*",
    "/warden/:path*",
    "/worker/:path*",
    "/superadmin/:path*",
  ],
};