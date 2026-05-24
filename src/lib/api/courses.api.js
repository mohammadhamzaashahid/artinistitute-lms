import { apiClient } from "./client";

export async function getCourses(params = {}) {
  const { data } = await apiClient.get("/api/courses", {
    params,
  });

  return data.data;
}

export async function getCourseBySlug(slug) {
  const { data } = await apiClient.get(`/api/courses/${slug}`);
  return data.data;
}