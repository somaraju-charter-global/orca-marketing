/**
 * One-time migration: flattens Vercel Blob keys from the old per-domain
 * layout `domains/<domain>/<prefix><name>` to the new flat layout
 * `<prefix><name>` (e.g. `domains/acme.com/jsons/foo.json` → `jsons/foo.json`).
 *
 * Requires BLOB_READ_WRITE_TOKEN in the environment.
 *
 *   npx tsx scripts/migrate-blob-storage.ts           # dry run — lists moves
 *   npx tsx scripts/migrate-blob-storage.ts --apply   # copies + deletes
 */
import { list, put, del } from "@vercel/blob";

try {
  process.loadEnvFile(".env.local");
} catch {
  // fall back to ambient env vars
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  try {
    process.loadEnvFile(".env");
  } catch {
    // fall back to ambient env vars
  }
}

const apply = process.argv.includes("--apply");
const DOMAIN_PREFIX = /^domains\/[\w.-]+\//;

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required");
  }

  const moves: { from: string; to: string; url: string }[] = [];
  let cursor: string | undefined;
  do {
    const result = await list({ cursor, limit: 1000 });
    for (const blob of result.blobs) {
      if (DOMAIN_PREFIX.test(blob.pathname)) {
        moves.push({
          from: blob.pathname,
          to: blob.pathname.replace(DOMAIN_PREFIX, ""),
          url: blob.url,
        });
      }
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  if (moves.length === 0) {
    console.log("No domain-prefixed blobs found. Nothing to do.");
    return;
  }

  for (const move of moves) {
    console.log(`${apply ? "Moving" : "[dry run]"} ${move.from} -> ${move.to}`);
    if (apply) {
      const source = await fetch(move.url);
      if (!source.ok || !source.body) {
        throw new Error(`Failed to fetch ${move.url} (${source.status})`);
      }
      await put(move.to, source.body, {
        access: "public",
        contentType:
          source.headers.get("content-type") ?? "application/octet-stream",
        allowOverwrite: true,
      });
      await del(move.from);
    }
  }

  console.log(
    apply
      ? `Done. Migrated ${moves.length} blob(s).`
      : `Dry run: ${moves.length} blob(s) would be migrated. Re-run with --apply.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
