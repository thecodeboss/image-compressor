export interface Options {
  batchSize: number;
  encoder: string;
  hwaccel: string;
  imageQuality: number;
  inputDir: string;
  keepMetadata: boolean;
  outputDir: string;
  videoPreset: string;
}

export interface RunResult {
  numSuccessful: number;
  totalInputSize: number;
  totalOutputSize: number;
  failedFiles: string[];
}

export enum SupportedFileType {
  AVI = ".avi",
  DIR = "",
  JPG = ".jpg",
  MOV = ".mov",
  MP4 = ".mp4",
  PNG = ".png",
}
