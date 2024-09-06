import fs from "fs/promises";
import path from "path";
import { supportedFileTypes } from "@/utils/compress";

export async function findFiles(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir, { recursive: true });

  for (const file of files) {
    if (!supportedFileTypes.includes(path.extname(file).toLowerCase())) {
      throw new Error(`Unsupported file: ${file}`);
    }
  }

  return files;
}
