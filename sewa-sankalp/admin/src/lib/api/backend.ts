const API_URL = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api"
).replace(/\/$/, "");

const ADMIN_KEY =
  process.env.ADMIN_API_KEY ||
  process.env.BACKEND_ADMIN_KEY ||
  "sewa-admin-dev-key";

export function getApiUrl() {
  return API_URL;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const headers = new Headers(init.headers || {});
    headers.set("x-admin-key", ADMIN_KEY);
    if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    const res = await fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
      ...init,
      headers,
      cache: "no-store",
    });
    const json = (await res.json()) as {
      ok?: boolean;
      data?: T;
      error?: string;
      url?: string;
    };
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error || `Request failed (${res.status})` };
    }
    return { ok: true, data: (json.data as T) ?? (json as unknown as T) };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Backend unavailable",
    };
  }
}

export async function adminGet<T>(path: string) {
  return request<T>(path);
}

export async function adminSend<T>(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
) {
  return request<T>(path, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export async function adminUpload<T>(path: string, formData: FormData) {
  return request<T>(path, { method: "POST", body: formData });
}
