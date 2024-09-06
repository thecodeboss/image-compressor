import type { Options } from "@/utils/types";

export const parseCommandLine = (args: string[]): Options => {
  const options: Options = {
    batchSize: 4,
    encoder: "libx265",
    hwaccel: "",
    imageQuality: 50,
    inputDir: "",
    keepMetadata: true,
    outputDir: "",
    videoPreset: "slow",
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (!arg.startsWith("-")) {
      if (!options.inputDir) {
        options.inputDir = arg;
        continue;
      } else if (!options.outputDir) {
        options.outputDir = arg;
        continue;
      }
    }

    switch (arg) {
      case "-b":
      case "--batch-size":
        options.batchSize = parseInt(args[i + 1], 10);
        i++;
        break;
      case "-e":
      case "--encoder":
        options.encoder = args[i + 1];
        i++;
        break;

      case "-h":
      case "--hwaccel":
        options.hwaccel = args[i + 1];
        i++;
        break;

      case "--no-metadata":
        options.keepMetadata = false;
        break;

      case "-q":
      case "--image-quality":
        options.imageQuality = parseInt(args[i + 1], 10);
        i++;
        break;

      case "-v":
      case "--video-preset":
        options.videoPreset = args[i + 1];
        i++;
        break;

      default:
        throw new Error(`Unknown flag: ${arg}\nCheck readme for command usage`);
    }
  }

  if (!options.inputDir) {
    throw new Error("Missing input directory, check readme for command usage");
  } else if (!options.outputDir) {
    throw new Error("Missing output directory, check readme for command usage");
  }

  return options;
};
