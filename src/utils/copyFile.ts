import fs from "fs/promises";

export async function copyFile(inputFile: string, outputFile: string) {
  const [inputInfo] = await Promise.all([
    fs.stat(inputFile),
    fs.copyFile(inputFile, outputFile),
  ]);

  return {
    file: inputFile,
    inputSize: inputInfo.size,
    outputSize: inputInfo.size,
  };
}
