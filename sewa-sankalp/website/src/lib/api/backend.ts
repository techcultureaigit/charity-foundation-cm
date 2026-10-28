const API_URL = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api"
).replace(/\/$/, "");

export function getApiUrl() {
  return API_URL;
}

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
      next: { revalidate: 0 },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { ok?: boolean; data?: T };
    if (!json?.ok) return null;
    return (json.data as T) ?? null;
  } catch {
    return null;
  }
}

export async function apiPost<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<{ ok: true; data?: T } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const json = (await res.json()) as {
      ok?: boolean;
      data?: T;
      error?: string;
    };
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error || "Request failed" };
    }
    return { ok: true, data: json.data };
  } catch {
    return { ok: false, error: "Backend unavailable" };
  }
}
