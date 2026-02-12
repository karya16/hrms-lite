const BASE_URL = "https://hrms-lite-azpo.onrender.com/api/";

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
