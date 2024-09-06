import path from "path";
import { compressImage } from "@/utils/compressImage";
import { compressVideo } from "@/utils/compressVideo";
import { copyFile } from "@/utils/copyFile";
import { SupportedFileType, type Options } from "@/utils/types";

export const supportedFileTypes = Object.values<string>(SupportedFileType);

export async function compress(
  inputFile: string,
  outputFile: string,
  options: Options
) {
  const inputExt = path.extname(inputFile).toLowerCase();
  switch (inputExt as SupportedFileType) {
    case "":
      return { file: inputFile, inputSize: 0, outputSize: 0 };
    case ".jpg":
      return compressImage(inputFile, outputFile, options);
    case ".png":
      return copyFile(inputFile, outputFile);
    case ".avi":
    case ".mp4":
    case ".mov":
      return compressVideo(inputFile, outputFile, options);
    default:
      throw new Error(`Unsupported file extension: ${inputExt}`);
  }
}
