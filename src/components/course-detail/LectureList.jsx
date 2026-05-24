"use client";

import LectureRow from "@/components/course-detail/LectureRow";

export default function LectureList({
  lectures = [],
  activeLectureId,
  loadingLectureId,
  onLectureClick,
}) {
  if (!lectures.length) {
    return (
      <div className="mt-7 rounded-[5px] border border-dashed border-[#dfe7f1] bg-[#f8fbff] p-8 text-center">
        <h3 className="text-xl font-bold text-[#20242a]">
          No lessons available yet
        </h3>
        <p className="mt-2 text-[#66788f]">
          Lessons will appear here once they are published.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-7 overflow-hidden rounded-[5px] border border-[#dfe7f1] bg-white">
      {lectures.map((lecture, index) => (
        <LectureRow
          key={lecture.id}
          lecture={lecture}
          index={index}
          isActive={activeLectureId === lecture.id}
          isLoading={loadingLectureId === lecture.id}
          onClick={() => onLectureClick(lecture)}
        />
      ))}
    </div>
  );
}