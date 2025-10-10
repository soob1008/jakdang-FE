import type { MetadataRoute } from "next";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

const BASE_URL = "https://jakdang.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient();

  const { data: authors } = await supabase
    .from("users")
    .select("slug, update_at");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/admin/compose`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const authorPages: MetadataRoute.Sitemap =
    authors?.map((author) => ({
      url: `${BASE_URL}/@${author.slug}`,
      lastModified: author.update_at ? new Date(author.update_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })) ?? [];

  return [...staticPages, ...authorPages];
}
