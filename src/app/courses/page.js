import CoursesPageClient from "./CoursesPageClient";

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function splitParam(value) {
  const raw = firstValue(value) || "";
  return raw ? raw.split(",").map((v) => v.trim().toLowerCase()).filter(Boolean) : [];
}

export default async function CoursesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawPage = Number(firstValue(resolvedSearchParams?.page) || 1);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const category = firstValue(resolvedSearchParams?.category) || "";
  const search = firstValue(resolvedSearchParams?.search) || "";
  const level = splitParam(resolvedSearchParams?.level);
  const price = firstValue(resolvedSearchParams?.price) || "";
  const language = splitParam(resolvedSearchParams?.language);
  const rating = firstValue(resolvedSearchParams?.rating) || "";

  return (
    <CoursesPageClient
      initialPage={page}
      initialCategory={category}
      initialSearch={search}
      initialLevel={level}
      initialPrice={price}
      initialLanguage={language}
      initialRating={rating}
    />
  );
}
