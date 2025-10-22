// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Qorunan səhifələr
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect(); // Bu səhifələrə yalnız login olmuş istifadəçilər buraxılır
  }
});

// Middleware hansı route-larda işləyəcək
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // bütün səhifələr üçün
    "/",
    "/(api|trpc)(.*)",
  ],
};
