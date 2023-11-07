// without a defined matcher, this one line applies next auth to all routes
export { default } from "next-auth/middleware";

// applies next auth to matching routes - can be regex
// REF https://next-auth.js.org/configuration/routes
// REF https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/employees", "/orders"],
};
