
export async function apiFetch<T>(path: string, options: RequestInit): Promise<T>;
export async function apiFetch<T>(path: string, options: RequestInit, baseUrl: string): Promise<T>;
export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  baseUrl?: string
): Promise<T>{
    const url = `${baseUrl || process.env.NEXT_PUBLIC_API_URL}`;
    const res = await fetch(`${url}${path}`, {
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
    