import { NextResponse } from "next/server";
import { isValidCompanyName, normalizeCompanyName } from "@/lib/company";
import { IntelligenceError, researchCompany } from "@/lib/openai";
import type { ApiErrorCode } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("invalid_company", 400);
  }

  const record = body && typeof body === "object" ? (body as { company?: unknown; context?: unknown }) : {};
  const company = record.company;

  if (typeof company !== "string" || !isValidCompanyName(company)) {
    return fail("invalid_company", 400);
  }

  try {
    const intelligence = await researchCompany(normalizeCompanyName(company), record.context);
    return NextResponse.json({ ok: true, intelligence });
  } catch (error) {
    const code: ApiErrorCode = error instanceof IntelligenceError ? error.code : "unavailable";
    if (!(error instanceof IntelligenceError)) {
      console.error("AccountPulse intelligence failed");
    }
    const status =
      code === "invalid_company" ? 400 : code === "missing_key" ? 503 : code === "timeout" ? 504 : code === "quota" ? 429 : 502;
    return fail(code, status);
  }
}

function fail(code: ApiErrorCode, status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}
