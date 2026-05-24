export function getCourseImage(course, type = "thumbnail") {
  if (!course) return "/images/course-placeholder.jpg";

  if (type === "banner") {
    return (
      course.bannerImageAsset?.preview?.url ||
      course.bannerImageAsset?.url ||
      course.thumbnailImageAsset?.preview?.url ||
      course.thumbnailImageAsset?.url ||
      "/images/course-placeholder.jpg"
    );
  }

  return (
    course.thumbnailImageAsset?.preview?.url ||
    course.thumbnailImageAsset?.url ||
    course.bannerImageAsset?.preview?.url ||
    course.bannerImageAsset?.url ||
    "/images/course-placeholder.jpg"
  );
}