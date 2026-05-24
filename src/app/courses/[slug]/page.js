import CourseDetailPageClient from "./CourseDetailPageClient";

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  return <CourseDetailPageClient slug={slug} />;
}