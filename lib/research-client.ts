import type { ApiErrorCode, Intelligence, IntelligenceApiResponse } from "@/lib/types";

const CLIENT_TIMEOUT_MS = 58_000;

export async function requestIntelligence(
  company: string,
): Promise<{ ok: true; intelligence: Intelligence } | { ok: false; code: ApiErrorCode | "network" }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  try {
    const response = await fetch("/api/intelligence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company }),
      signal: controller.signal,
    });

    const payload = (await response.json()) as IntelligenceApiResponse;
    if (payload && payload.ok === true && payload.intelligence) {
      return { ok: true, intelligence: payload.intelligence };
    }
    if (payload && payload.ok === false && payload.code) {
      return { ok: false, code: payload.code };
    }
    return { ok: false, code: "unavailable" };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, code: "timeout" };
    }
    return { ok: false, code: "network" };
  } finally {
    clearTimeout(timer);
  }
}
