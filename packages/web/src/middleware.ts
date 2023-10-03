import { authMiddleware } from "@clerk/nextjs";

const publicPaths = [
  "/",
  "/sign-in*",
  "/sign-up*",
  "/api/trpc*",
  "/api/clerk/webhook",
];

const isPublic = (path: string) => {
  return publicPaths.find((publicPath) =>
    path.match(new RegExp(`^${publicPath}$`.replace("*$", "($|/)")))
  );
};

export default authMiddleware({
  publicRoutes(req) {
    const result = isPublic(req.nextUrl.pathname) !== undefined;
    return result;
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
