import { Suspense } from "react";
import BookDetailPageClient from "./BookDetailPageClient";
import BookDetailSkeleton from "@/components/books/BookDetailSkeleton";
import Container from "@/components/common/Container";

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
    <Suspense
      fallback={
        <div className="bg-white pb-20 pt-10">
          <Container>
            <BookDetailSkeleton />
          </Container>
        </div>
      }
    >
      <BookDetailPageClient slug={slug} />
    </Suspense>
  );
}
