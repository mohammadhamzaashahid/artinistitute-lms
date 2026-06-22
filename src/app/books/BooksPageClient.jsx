"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import BooksHeroBanner from "@/components/books/BooksHeroBanner";
import BookCard from "@/components/books/BookCard";
import BookCardSkeleton from "@/components/books/BookCardSkeleton";
import { useBooks } from "@/lib/hooks/useBooks";

function getList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.books)) return data.books;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function BooksPageClient({ initialSearch = "", initialPage = 1 }) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [inputValue, setInputValue] = useState(initialSearch);

  const params = { page: initialPage, limit: 12 };
  if (search) params.search = search;

  const { data, isLoading, isError } = useBooks(params);
  const books = getList(data);
  const pagination = data?.pagination;

  function handleSearch(e) {
    e.preventDefault();
    const value = inputValue.trim();
    setSearch(value);
    const url = value ? `/books?search=${encodeURIComponent(value)}` : "/books";
    router.push(url, { scroll: false });
  }

  function clearSearch() {
    setInputValue("");
    setSearch("");
    router.push("/books", { scroll: false });
  }

  return (
    <div className="bg-white">
      <Container className="pt-8 sm:pt-10">
        {/* Hero */}
        <BooksHeroBanner />

        {/* Search */}
        <div className="py-8 sm:py-10">
          <form onSubmit={handleSearch} className="mx-auto max-w-[680px]">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-[19px] w-[19px] text-[#93a3b5]" />
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search books by title or topic…"
                className="h-[52px] w-full rounded-2xl border border-[#dfe7f1] bg-white pl-12 pr-14 text-[16px] text-[#334155] shadow-sm outline-none transition placeholder:text-[#9aa8b8] focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f5f9] text-[#8a9aad] transition hover:bg-[#e3eaf3] hover:text-[#20242a]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results header */}
        {search && (
          <div className="mb-5 flex items-center gap-2">
            <p className="text-[15px] text-[#66788f]">
              Results for{" "}
              <span className="font-semibold text-[#20242a]">"{search}"</span>
            </p>
            {!isLoading && books.length > 0 && (
              <span className="rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-[12px] font-semibold text-[#66788f]">
                {pagination?.total ?? books.length}
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="pb-16 sm:pb-20">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <EmptyState
              title="Unable to load books"
              description="Please check your connection and try again."
            />
          ) : books.length === 0 ? (
            <EmptyState
              title="No books found"
              description={
                search
                  ? "Try a different search term."
                  : "No books are available yet. Check back soon!"
              }
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {books.map((book, index) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    index={index}
                    priority={index < 4}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {Array.from({ length: pagination.totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isActive = page === (pagination.page ?? initialPage);
                    const searchQ = search ? `&search=${encodeURIComponent(search)}` : "";
                    return (
                      <a
                        key={page}
                        href={`/books?page=${page}${searchQ}`}
                        className={
                          isActive
                            ? "flex h-9 min-w-[36px] items-center justify-center rounded-xl bg-[#377dff] px-3 text-[14px] font-bold text-white shadow-sm"
                            : "flex h-9 min-w-[36px] items-center justify-center rounded-xl border border-[#e3eaf3] bg-white px-3 text-[14px] font-medium text-[#52657a] transition hover:border-[#377dff] hover:text-[#377dff]"
                        }
                      >
                        {page}
                      </a>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
