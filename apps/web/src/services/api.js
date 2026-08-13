const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
