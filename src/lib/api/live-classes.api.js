import { apiClient } from "./client";

export async function getLiveClasses(params = {}) {
  const { data } = await apiClient.get("/api/live-classes", {
    params,
  });

  return data.data;
}

export async function getLiveClassBySlug(slug) {
  const { data } = await apiClient.get(`/api/live-classes/${slug}`);
  return data.data;
}
