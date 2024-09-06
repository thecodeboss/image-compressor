import fs from "fs/promises";

const existsCache = new Set<string>();
export async function ensureDirExists(dir: string) {
  if (existsCache.has(dir)) {
    return;
  }

  try {
    await fs.stat(dir);
    existsCache.add(dir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.mkdir(dir, { recursive: true });
      existsCache.add(dir);
    } else {
      throw err;
    }
  }
}
