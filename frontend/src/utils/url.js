import { API_BASE_URL } from "../api/client";

export function buildAssetUrl(path) {
  if (!path) return "";

  // Zaten tam URL ise dokunma (http / https)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Backend'in static yolu: /static/...
  if (path.startsWith("/static/")) {
    return `${API_BASE_URL}${path}`;
  }

  // Aksi durumda olduğu gibi bırak
  return path;
}
