import CoursesPageClient from "./CoursesPageClient";

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CoursesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawPage = Number(firstValue(resolvedSearchParams?.page) || 1);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const category = firstValue(resolvedSearchParams?.category) || "";
  const search = firstValue(resolvedSearchParams?.search) || "";

  return (
    <CoursesPageClient
      initialPage={page}
      initialCategory={category}
      initialSearch={search}
    />
  );
}
