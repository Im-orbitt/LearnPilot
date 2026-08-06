const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function uploadPdf(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

export async function getBackendStatus() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Backend offline");
  }

  return response.json();
}