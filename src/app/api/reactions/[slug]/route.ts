import { NextRequest, NextResponse } from "next/server";
import { allPosts } from "content-collections";
import { PostReactions, REACTIONS, Reaction } from "@/lib/reactions";
import { isRateLimited, store as storeOrNull, storeKey } from "@/lib/store";

// An anonymous random ID, so each visitor can leave each reaction once
const VISITOR_COOKIE = "visitor";

const slugs = new Set(
  allPosts.map((post) => post._meta.fileName.split(".")[0]),
);

// Each reaction is a set with the IDs of the visitors who left it
const reactionKey = (slug: string, reaction: Reaction) =>
  storeKey(`reactions:${slug}:${reaction}`);

async function getReactions(
  store: NonNullable<typeof storeOrNull>,
  slug: string,
  visitor?: string,
) {
  // Sent together, since the client batches the commands of the same tick into one request
  const reactions = await Promise.all(
    REACTIONS.map(async ({ id }) => {
      const [count, mine] = await Promise.all([
        store.scard(reactionKey(slug, id)),
        visitor ? store.sismember(reactionKey(slug, id), visitor) : 0,
      ]);
      return { id, count, mine };
    }),
  );

  return {
    counts: Object.fromEntries(reactions.map(({ id, count }) => [id, count])),
    mine: reactions.filter(({ mine }) => mine).map(({ id }) => id),
  } as PostReactions;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const store = storeOrNull;
  if (!store) return new NextResponse("Reactions are off", { status: 503 });
  if (!slugs.has(slug))
    return new NextResponse("No such post", { status: 404 });

  return NextResponse.json(
    await getReactions(store, slug, request.cookies.get(VISITOR_COOKIE)?.value),
  );
}

// Leaves a reaction when `on` is true, and takes it back when it's false
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const store = storeOrNull;
  if (!store) return new NextResponse("Reactions are off", { status: 503 });
  if (!slugs.has(slug))
    return new NextResponse("No such post", { status: 404 });

  const { reaction, on } = await request.json().catch(() => ({}));
  if (!REACTIONS.some(({ id }) => id === reaction) || typeof on !== "boolean") {
    return new NextResponse("Invalid reaction", { status: 400 });
  }
  if (await isRateLimited(store, request, "reactions", 30)) {
    return new NextResponse("Too many reactions", { status: 429 });
  }

  const visitor =
    request.cookies.get(VISITOR_COOKIE)?.value ?? crypto.randomUUID();
  if (on) await store.sadd(reactionKey(slug, reaction), visitor);
  else await store.srem(reactionKey(slug, reaction), visitor);

  const response = NextResponse.json(await getReactions(store, slug, visitor));
  response.cookies.set(VISITOR_COOKIE, visitor, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/reactions",
  });
  return response;
}
