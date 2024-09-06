import fs from "fs/promises";
import { spawn } from "@/utils/spawn";
import type { Options } from "@/utils/types";

function getFFMpegArgs(
  inputFile: string,
  outputFile: string,
  options: Options
) {
  return [
    "-y",
    ...(options.hwaccel ? ["-hwaccel", options.hwaccel] : []),
    "-i",
    inputFile,
    "-c:v",
    options.encoder,
    "-preset",
    options.videoPreset,
    ...(options.keepMetadata ? ["-map_metadata", "0"] : []),
    outputFile,
  ];
}

export async function compressVideo(
  inputFile: string,
  outputFile: string,
  options: Options
) {
  const [inputInfo, ffmpegResult] = await Promise.all([
    fs.stat(inputFile),
    spawn("ffmpeg", getFFMpegArgs(inputFile, outputFile, options)),
  ]);

  if (ffmpegResult.exitCode !== 0) {
    return {
      file: inputFile,
      inputSize: inputInfo.size,
      outputSize: 0,
    };
  }

  const outputInfo = await fs.stat(outputFile);

  return {
    file: inputFile,
    inputSize: inputInfo.size,
    outputSize: outputInfo.size,
  };
}
