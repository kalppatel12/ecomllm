import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function getOrCreateSessionId(): Promise<string> {
  const store = await cookies();
  let sid = store.get("session_id")?.value;
  if (!sid) {
    sid = randomUUID();
    store.set("session_id", sid, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
  }
  return sid;
}
