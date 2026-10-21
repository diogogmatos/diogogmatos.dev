import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

// The Redis commands used by the visitor counter and the reactions
interface Store {
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<0 | 1>;
  set<T>(key: string, value: T, opts: { get: true }): Promise<T | "OK" | null>;
  sadd(key: string, member: string): Promise<number>;
  srem(key: string, member: string): Promise<number>;
  scard(key: string): Promise<number>;
  sismember(key: string, member: string): Promise<0 | 1>;
}

// Stands in for Redis when running locally without one. It forgets everything on restart
function memoryStore(): Store {
  const values = new Map<string, unknown>();
  const sets = new Map<string, Set<string>>();
  const members = (key: string) => {
    if (!sets.has(key)) sets.set(key, new Set());
    return sets.get(key)!;
  };

  return {
    async incr(key) {
      const value = ((values.get(key) as number) ?? 0) + 1;
      values.set(key, value);
      return value;
    },
    async expire(key, seconds) {
      setTimeout(() => values.delete(key), seconds * 1000);
      return 1;
    },
    async set<T>(key: string, value: T) {
      const previous = (values.get(key) ?? null) as T | null;
      values.set(key, value);
      return previous;
    },
    async sadd(key, member) {
      if (members(key).has(member)) return 0;
      members(key).add(member);
      return 1;
    },
    async srem(key, member) {
      return members(key).delete(member) ? 1 : 0;
    },
    async scard(key) {
      return members(key).size;
    },
    async sismember(key, member) {
      return members(key).has(member) ? 1 : 0;
    },
  };
}

// An Upstash Redis database, from the environment variables its Vercel integration adds.
// Without one, there's a stand-in locally, and the features that need it are hidden elsewhere
export const store: Store | null =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
    ? Redis.fromEnv()
    : process.env.NODE_ENV === "development"
      ? memoryStore()
      : null;

// Keeps the data of preview deployments and local runs apart from production's
export function storeKey(name: string) {
  const environment = process.env.VERCEL_ENV ?? "development";
  return environment === "production" ? name : `${environment}:${name}`;
}

// Whether this IP address made more than `limit` requests to `name` in the last minute.
// Addresses are only kept as hashes, and only for that minute
export async function isRateLimited(
  store: Store,
  request: Request,
  name: string,
  limit: number,
) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const hash = createHash("sha256")
    .update(ip ?? "unknown")
    .digest("hex")
    .slice(0, 16);
  const key = storeKey(`rate-limit:${name}:${hash}`);

  const requests = await store.incr(key);
  if (requests === 1) await store.expire(key, 60);
  return requests > limit;
}
