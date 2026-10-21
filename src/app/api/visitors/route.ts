import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, store, storeKey } from "@/lib/store";

// The visitor's number and when they last opened a page, as "number:timestamp"
const VISITOR_COOKIE = "visitor-number";

// Visitors Umami counted before the counter existed, so the count carries on from there
const VISITORS_BEFORE_COUNTER = 149;

// Visitors who come back after this long are welcomed back
const VISIT_LENGTH = 30 * 60 * 1000;

// Gives a new visitor the next number, and tells visitors who already have one what it is
export async function POST(request: NextRequest) {
  if (!store) return new NextResponse("The counter is off", { status: 503 });

  const [number, lastSeen] = (request.cookies.get(VISITOR_COOKIE)?.value ?? "")
    .split(":")
    .map(Number);
  const known = Number.isInteger(number) && number > 0;

  if (!known && (await isRateLimited(store, request, "visitors", 10))) {
    return new NextResponse("Too many visitors", { status: 429 });
  }
  const visitor = known
    ? number
    : (await store.incr(storeKey("visitors"))) + VISITORS_BEFORE_COUNTER;

  const response = NextResponse.json({
    number: visitor,
    returning: known && Date.now() - lastSeen > VISIT_LENGTH,
  });
  response.cookies.set(VISITOR_COOKIE, `${visitor}:${Date.now()}`, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/visitors",
  });
  return response;
}
