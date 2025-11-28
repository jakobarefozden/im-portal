// src/api/client.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";


async function request(path) {
  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // Hata mesajını okumaya çalış
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.error) {
        message = data.error;
      }
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return res.json();
}

export { request, API_BASE_URL };
