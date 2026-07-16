import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirections SEO (hors admin)
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    try {
      const response = NextResponse.next({ request });
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) =>
                request.cookies.set(name, value)
              );
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      const { data } = await supabase
        .from("redirects")
        .select("to_path, status_code")
        .eq("from_path", pathname)
        .eq("is_active", true)
        .maybeSingle();

      if (data?.to_path) {
        const target = data.to_path.startsWith("http")
          ? data.to_path
          : new URL(data.to_path, request.url).toString();
        return NextResponse.redirect(target, data.status_code || 301);
      }
    } catch {
      /* ignore redirect lookup failures */
    }
  }

  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$).*)",
  ],
};
