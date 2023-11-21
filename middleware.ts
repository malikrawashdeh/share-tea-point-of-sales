// without a defined matcher, this one line applies next auth to all routes
// export { default } from "next-auth/middleware";
// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)

    if (
      request.nextUrl.pathname.startsWith("/employees") &&
      request.nextauth.token?.role !== "admin" &&
      request.nextauth.token?.role !== "employee" &&
      request.nextauth.token?.role !== "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // TODO: add more routes to restrict
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// applies next auth to matching routes - can be regex
// REF https://next-auth.js.org/configuration/routes
// REF https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/employees", "/orders"],
};
