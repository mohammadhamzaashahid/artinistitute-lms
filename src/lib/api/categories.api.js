import { apiClient } from "./client";

export async function getCategories() {
  const { data } = await apiClient.get("/api/categories");
  return data.data;
}