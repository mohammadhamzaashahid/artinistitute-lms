import { Suspense } from "react";
import BooksPageClient from "./BooksPageClient";

export const metadata = {
  title: "Books",
  description:
    "Browse our curated collection of printed books with full audio libraries. Learn while commuting, exercising, or winding down.",
};

export default function BooksPage({ searchParams }) {
  const params = searchParams ?? {};
  const search = typeof params.search === "string" ? params.search : "";
  const page = Number(params.page) || 1;

  return (
    <Suspense>
      <BooksPageClient initialSearch={search} initialPage={page} />
    </Suspense>
  );
}
