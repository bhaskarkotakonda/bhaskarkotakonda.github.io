import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

// Match any route starting with /os or /api/os
const isProtectedRoute = createRouteMatcher(["/os(.*)", "/api/os(.*)"]);

export const onRequest = clerkMiddleware((auth, context, next) => {
  if (isProtectedRoute(context.request)) {
    const userId = auth().userId;

    if (!userId) {
      return auth().redirectToSignIn({ returnBackUrl: context.url.href });
    }

    const allowedUsersStr = import.meta.env.PERSONAL_OS_ALLOWED_USER_IDS || "";
    const allowedUsers = allowedUsersStr.split(",").map((s: string) => s.trim());

    if (!allowedUsers.includes(userId)) {
      return new Response("Unauthorized Account", { status: 401 });
    }
  }

  return next();
});
