export async function apiFetch<T>(
  BASE_URL: string,
  path: string,
  options?: RequestInit,
): Promise<T>{
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options?.method && options.method !== "GET"
          ? { "Content-Type": "application/json" }
          : {}),
        ...(options?.headers || {}),
      },
      credentials: "include",
    });

    if(!res.ok){
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || res.statusText)
    }
    return res.json()
}
    