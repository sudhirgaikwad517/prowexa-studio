// Small JSON client for the /api serverless routes.
export type ApiResult<T = unknown> = { success: boolean; data?: T; error?: string; [key: string]: unknown };

export async function apiFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const response = await fetch(path, {
      credentials: "same-origin",
      ...init,
      headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    });
    const body = (await response.json().catch(() => ({}))) as ApiResult<T>;
    if (!response.ok) {
      return { ...body, success: false, error: body.error || `Request failed (${response.status})` };
    }
    return { ...body, success: body.success !== false };
  } catch {
    return { success: false, error: "Network error. Please check your connection and try again." };
  }
}

export const jsonBody = (data: unknown) => JSON.stringify(data);
