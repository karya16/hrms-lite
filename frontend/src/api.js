const BASE_URL = "http://127.0.0.1:8000/api/";

export const api = async (endpoint, options = {}) => {
  const res = await fetch(BASE_URL + endpoint, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Throw the entire error object from DRF
    throw data;
  }

  return data;
};
