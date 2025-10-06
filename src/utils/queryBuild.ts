import qs from "query-string";

export function buildQuery<T extends Record<string, any>>(filters: T): string {
  const filtered: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      filtered[key] = value;
    }
  });

  return qs.stringify(filtered);
}