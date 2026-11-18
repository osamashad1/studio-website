import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Sends "/" to "/de" (or "/en" for English browsers) and keeps the locale in every URL.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next.js internals and files with an extension (images, etc.)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
