const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artininstitute.com";

export default function sitemap() {
  const routes = ["", "/courses"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "daily",
    priority: route === "" ? 1 : 0.9,
  }));
}
