import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, store, storeKey } from "@/lib/store";

// The visitor's number and when they first opened a page, as "number:timestamp"
const VISITOR_COOKIE = "visitor-number";

// Visitors Umami counted before the counter existed, so the count carries on from there
const VISITORS_BEFORE_COUNTER = 149;

// Once this long has passed since their first page, visitors are welcomed back on every page
const VISIT_LENGTH = 30 * 60 * 1000;

// Gives a new visitor the next number, and tells visitors who already have one what it is
export async function POST(request: NextRequest) {
  if (!store) return new NextResponse("The counter is off", { status: 503 });

  const [number, firstSeen] = (request.cookies.get(VISITOR_COOKIE)?.value ?? "")
    .split(":")
    .map(Number);
  const known = Number.isInteger(number) && number > 0;

  if (!known && (await isRateLimited(store, request, "visitors", 10))) {
    return new NextResponse("Too many visitors", { status: 429 });
  }
  const visitor = known
    ? number
    : (await store.incr(storeKey("visitors"))) + VISITORS_BEFORE_COUNTER;
  const since = known && Number.isFinite(firstSeen) ? firstSeen : Date.now();

  const response = NextResponse.json({
    number: visitor,
    returning: Date.now() - since > VISIT_LENGTH,
  });
  // Set again on every page, so it only expires a year after their last visit
  response.cookies.set(VISITOR_COOKIE, `${visitor}:${since}`, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/visitors",
  });
  return response;
}
