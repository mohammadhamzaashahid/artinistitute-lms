import LiveClassesPageClient from "./LiveClassesPageClient";

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LiveClassesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawPage = Number(firstValue(resolvedSearchParams?.page) || 1);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const search = firstValue(resolvedSearchParams?.search) || "";

  return <LiveClassesPageClient initialPage={page} initialSearch={search} />;
}
