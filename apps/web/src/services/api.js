import { API_URL } from "./config";

export async function getBooks() {
  const response = await fetch(`${API_URL}/books`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to load books.");
  }

  return response.json();
}

export async function uploadPdf(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Upload failed.");
  }

  return data;
}

export async function getBackendStatus() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Backend offline (${response.status})`);
  }

  return response.json();
}
