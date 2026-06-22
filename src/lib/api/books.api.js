import { apiClient } from "./client";

export async function getBooks(params = {}) {
  const { data } = await apiClient.get("/api/books", { params });
  return data.data;
}

export async function getBookBySlug(slug) {
  const { data } = await apiClient.get(`/api/books/${slug}`);
  return data.data?.book ?? data.data;
}

export async function getBookAudioPlayback(bookId, audioFileId) {
  const { data } = await apiClient.get(
    `/api/books/${bookId}/audio-files/${audioFileId}/playback`
  );
  return data.data;
}

export async function placeBookOrder(bookId, payload) {
  const { data } = await apiClient.post(`/api/books/${bookId}/orders`, payload);
  return data.data;
}

export async function getMyBookOrders(params = {}) {
  const { data } = await apiClient.get("/api/books/orders/my", { params });
  return data.data;
}

export async function getMyBookOrderDetail(orderId) {
  const { data } = await apiClient.get(`/api/books/orders/my/${orderId}`);
  return data.data;
}
