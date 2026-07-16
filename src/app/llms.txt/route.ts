import { getSiteSettings } from "@/lib/settings";
import { resolveSeoSettings } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSiteSettings();
  const seo = resolveSeoSettings(settings);

  return new Response(seo.llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
