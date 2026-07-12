"use client";

import LiveClassVideoCard from "@/components/live-class-detail/LiveClassVideoCard";

export default function LiveClassVideoSection({
  videos = [],
  loadingVideoId,
  onVideoClick,
}) {
  if (!videos.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-[22px] font-bold tracking-[-0.04em] text-[#20242a]">
        Class recordings
      </h2>

      <p className="mt-1 text-[14px] text-[#66788f]">
        {videos.length} video{videos.length === 1 ? "" : "s"} · purchase this
        class to unlock full access
      </p>

      <div className="mt-5 flex flex-col gap-4">
        {videos.map((video, index) => (
          <LiveClassVideoCard
            key={video.id}
            video={video}
            index={index}
            isLoading={loadingVideoId === video.id}
            onClick={() => onVideoClick(video)}
          />
        ))}
      </div>
    </section>
  );
}
