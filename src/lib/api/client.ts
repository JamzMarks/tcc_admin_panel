export async function apiFetch<T>(
  path: string,
  options: RequestInit
): Promise<T>;
export async function apiFetch<T>(
  path: string,
  options: RequestInit,
  baseUrl: string
): Promise<T>;
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  baseUrl?: string
): Promise<T> {
  const url = `${baseUrl || process.env.NEXT_PUBLIC_API_URL}`;
  const res = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      ...(!(options?.body instanceof FormData) &&
      options?.method &&
      options.method !== "GET"
        ? { "Content-Type": "application/json" }
        : {}),
      ...(options?.headers || {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || res.statusText);
  }
  const contentType = res.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }

  if (contentType.includes("image/")) {
    return (await res.blob()) as T;
  }

  // fallback genérico
  return (await res.text()) as T;
}
