export function normalizeLiveClassDetail(data) {
  if (!data) return null;
  return data.liveClass || data;
}

export function getLiveClassPrices(liveClass) {
  if (!liveClass) return [];
  if (Array.isArray(liveClass.prices)) return liveClass.prices;
  return [];
}

export function getLiveClassPrice(liveClass) {
  const prices = getLiveClassPrices(liveClass);
  return prices.find((price) => price.isActive !== false) || prices[0] || null;
}

export function canUserAccessLiveClass(liveClass) {
  return Boolean(liveClass?.access?.hasAccess);
}

export function getLiveClassMaterials(liveClass) {
  if (!liveClass?.materials?.length) return [];
  return [...liveClass.materials].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
  );
}

export function getLiveClassVideos(liveClass) {
  if (!liveClass?.videos?.length) return [];
  return [...liveClass.videos].sort(
    (a, b) => (a.videoOrder || 0) - (b.videoOrder || 0)
  );
}

export function canPlayLiveClassVideo(video) {
  return Boolean(video?.canPlay);
}

export function isLiveClassVideoLocked(video) {
  if (typeof video?.isLocked === "boolean") return video.isLocked;
  return !video?.canPlay;
}

const PHASE = {
  UPCOMING: "UPCOMING",
  LIVE: "LIVE",
  ENDED: "ENDED",
};

export function getLiveClassPhase(liveClass, now = new Date()) {
  if (!liveClass?.startDate || !liveClass?.endDate) return PHASE.UPCOMING;

  const start = new Date(liveClass.startDate).getTime();
  const end = new Date(liveClass.endDate).getTime();
  const current = now.getTime();

  if (current < start) return PHASE.UPCOMING;
  if (current > end) return PHASE.ENDED;
  return PHASE.LIVE;
}

export function getLiveClassPhaseLabel(phase) {
  if (phase === PHASE.LIVE) return "Live now";
  if (phase === PHASE.ENDED) return "Ended";
  return "Upcoming";
}

export function formatTimeUntil(targetDate, now = new Date()) {
  if (!targetDate) return "";

  const diffMs = new Date(targetDate).getTime() - now.getTime();
  if (diffMs <= 0) return "";

  const minutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${Math.max(mins, 1)}m`;
}

export function formatLiveClassTime(isoString) {
  if (!isoString) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(isoString));
  } catch {
    return "";
  }
}

export function buildGoogleCalendarUrl(liveClass) {
  if (!liveClass?.startDate || !liveClass?.endDate) return null;

  const toUtcStamp = (iso) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: liveClass.title || "Live class",
    dates: `${toUtcStamp(liveClass.startDate)}/${toUtcStamp(liveClass.endDate)}`,
    details: liveClass.description || "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
