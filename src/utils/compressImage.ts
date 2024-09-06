import fs from "fs/promises";
import sharp from "sharp";
import type { Options } from "@/utils/types";

export async function compressImage(
  inputFile: string,
  outputFile: string,
  options: Options
) {
  const sharpInstance = sharp(inputFile);

  if (options.keepMetadata) {
    sharpInstance.withMetadata().rotate();
  }

  const [inputInfo, outputInfo] = await Promise.all([
    fs.stat(inputFile),
    sharpInstance
      .jpeg({ mozjpeg: true, quality: options.imageQuality })
      .toFile(outputFile),
  ]);

  return {
    file: inputFile,
    inputSize: inputInfo.size,
    outputSize: outputInfo.size,
  };
}
