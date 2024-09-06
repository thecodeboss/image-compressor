import path from "path";
import { SupportedFileType } from "@/utils/types";

// Mapping of input formats to output formats
const EXT_MAPPING = {
  [SupportedFileType.AVI]: ".mp4",
  [SupportedFileType.DIR]: "",
  [SupportedFileType.JPG]: ".jpg",
  [SupportedFileType.MOV]: ".mp4",
  [SupportedFileType.MP4]: ".mp4",
  [SupportedFileType.PNG]: ".png",
};

export function changeFileExtension(file: string): string {
  const ext =
    EXT_MAPPING[path.extname(file).toLowerCase() as SupportedFileType];

  // Special case for directories
  if (!ext) return file;

  return file.replace(/\.[a-z0-9]+$/i, ext);
}
