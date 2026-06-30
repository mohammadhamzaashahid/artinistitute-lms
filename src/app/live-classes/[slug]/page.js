import LiveClassDetailPageClient from "./LiveClassDetailPageClient";

export default async function LiveClassDetailPage({ params }) {
  const { slug } = await params;
  return <LiveClassDetailPageClient slug={slug} />;
}
