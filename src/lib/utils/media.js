const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

function buildUploadUrl(objectKey) {
  if (!objectKey) return null;

  const base = API_BASE_URL.replace(/\/+$/, "");
  const encodedKey = String(objectKey)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${base}/uploads/${encodedKey}`;
}

function resolveAssetUrl(asset) {
  if (!asset) return null;

  if (asset.objectKey && (!asset.provider || asset.provider === "LOCAL")) {
    return buildUploadUrl(asset.objectKey);
  }

  return asset.preview?.url || asset.url || asset.publicUrl || null;
}

export function getCourseImage(course, type = "thumbnail") {
  if (!course) return "/images/course-placeholder.jpg";

  const thumbnailUrl = resolveAssetUrl(course.thumbnailImageAsset);
  const bannerUrl = resolveAssetUrl(course.bannerImageAsset);

  if (type === "banner") {
    return bannerUrl || thumbnailUrl || "/images/course-placeholder.jpg";
  }

  return thumbnailUrl || bannerUrl || "/images/course-placeholder.jpg";
}
