const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/";

export const api = async (endpoint, options = {}) => {
  const res = await fetch(BASE_URL + endpoint, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw data;
  }

  return data;
};