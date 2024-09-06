import { prettyPrintBytes } from "@/utils/prettyPrintBytes";
import type { RunResult } from "@/utils/types";

export function summarize(results: RunResult) {
  const { totalInputSize, totalOutputSize, failedFiles, numSuccessful } =
    results;

  const inputSize = prettyPrintBytes(totalInputSize);
  const outputSize = prettyPrintBytes(totalOutputSize);
  const percent = (100 * (totalOutputSize / totalInputSize)).toFixed(2);
  if (failedFiles.length > 0) {
    console.log(`Failed files: ${failedFiles.join(", ")}`);
  }
  console.log(
    `Compressed ${numSuccessful} files. Original: ${inputSize}, Compressed: ${outputSize} (${percent}%)`
  );
}
