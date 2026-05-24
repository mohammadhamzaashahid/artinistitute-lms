import { apiClient } from "./client";

export async function getLecturePlaybackUrl(lectureId) {
  const { data } = await apiClient.get(`/api/lectures/${lectureId}/playback-url`);
  return data.data;
}