const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artininstitute.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/checkout", "/auth"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
