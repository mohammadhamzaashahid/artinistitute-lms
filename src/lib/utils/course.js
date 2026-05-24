export function normalizeCourseDetail(data) {
  if (!data) return null;
  return data.course || data;
}

export function getCourseLectures(course) {
  if (!course) return [];
  if (Array.isArray(course.lectures)) return course.lectures;
  return [];
}

export function getCoursePrices(course) {
  if (!course) return [];
  if (Array.isArray(course.prices)) return course.prices;
  return [];
}

export function getPrimaryCoursePrice(course) {
  const prices = getCoursePrices(course);
  return prices.find((price) => price.isActive !== false) || prices[0] || null;
}

export function getCourseTags(course) {
  if (!course?.tags?.length) return [];

  return course.tags
    .map((item) => item.tag || item)
    .filter(Boolean);
}

export function canUserAccessCourse(course) {
  return Boolean(course?.access?.hasAccess);
}

export function canPlayLecture(lecture) {
  return Boolean(lecture?.canPlay);
}

export function isLectureLocked(lecture) {
  if (typeof lecture?.isLocked === "boolean") return lecture.isLocked;
  return !lecture?.canPlay;
}

export function getTotalDurationSeconds(lectures = []) {
  return lectures.reduce(
    (total, lecture) => total + Number(lecture.durationSeconds || 0),
    0
  );
}