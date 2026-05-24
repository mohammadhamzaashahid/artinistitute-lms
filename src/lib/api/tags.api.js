import { apiClient } from "./client";

export async function getTags() {
  const { data } = await apiClient.get("/api/tags");
  return data.data;
}