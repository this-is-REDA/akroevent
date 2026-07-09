import { buildOrganizationJsonLd } from "@/lib/seo";
import type { SiteSettingsPublic } from "@/types/settings";

export default function SeoJsonLd({
  settings,
}: {
  settings: SiteSettingsPublic;
}) {
  const jsonLd = buildOrganizationJsonLd(settings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
