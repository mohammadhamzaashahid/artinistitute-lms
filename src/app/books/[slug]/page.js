import { Suspense } from "react";
import BookDetailPageClient from "./BookDetailPageClient";
import PageLoader from "@/components/common/PageLoader";

export async function generateMetadata({ params }) {
  const slug = (await params)?.slug ?? "";
  return {
    title: `Book`,
    description: "Browse this book and listen to its audio tracks.",
    alternates: { canonical: `/books/${slug}` },
  };
}

export default async function BookDetailPage({ params }) {
  const slug = (await params)?.slug ?? "";

  return (
    <Suspense fallback={<PageLoader label="Loading book" />}>
      <BookDetailPageClient slug={slug} />
    </Suspense>
  );
}
