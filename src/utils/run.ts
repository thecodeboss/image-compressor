import path from "path";
import pLimit from "p-limit";

import { changeFileExtension } from "@/utils/changeFileExtension";
import { compress } from "@/utils/compress";
import { prettyPrintBytes } from "@/utils/prettyPrintBytes";
import type { Options, RunResult } from "@/utils/types";
import { ensureDirExists } from "@/utils/ensureDirExists";
import { findFiles } from "@/utils/findFiles";

export async function run(options: Options): Promise<RunResult> {
  const inputFiles = await findFiles(options.inputDir);

  // Ensure the output directory and sub-directories exist
  for (const inputFile of inputFiles) {
    const outputFile = path.join(options.outputDir, inputFile);
    await ensureDirExists(path.dirname(outputFile));
  }

  let numSuccessful = 0;
  let totalInputSize = 0;
  let totalOutputSize = 0;
  const failedFiles: string[] = [];

  const limit = pLimit(options.batchSize);

  // Compress the images in batches
  await Promise.all(
    inputFiles.map(async (inputFile) => {
      return limit(async () => {
        if (!path.extname(inputFile)) {
          return;
        }
        const inputFileFullPath = path.join(options.inputDir, inputFile);
        const outputFileFullPath = changeFileExtension(
          path.join(options.outputDir, inputFile)
        );
        const result = await compress(
          inputFileFullPath,
          outputFileFullPath,
          options
        );
        if (result.outputSize === 0) {
          failedFiles.push(result.file);
          return;
        }

        numSuccessful++;
        totalInputSize += result.inputSize;
        totalOutputSize += result.outputSize;

        const inputSize = prettyPrintBytes(result.inputSize);
        const outputSize = prettyPrintBytes(result.outputSize);
        const percent = (100 * (result.outputSize / result.inputSize)).toFixed(
          2
        );

        console.log(
          `Compressed ${result.file}. Original: ${inputSize}, Compressed: ${outputSize} (${percent}%)`
        );
      });
    })
  );

  return {
    numSuccessful,
    totalInputSize,
    totalOutputSize,
    failedFiles,
  };
}
