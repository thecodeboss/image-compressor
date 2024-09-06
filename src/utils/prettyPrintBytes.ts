export function prettyPrintBytes(bytes: number): string {
  const sizes = ["B", "KB", "MB", "GB", "TB"];

  if (bytes === 0) {
    return "0 B";
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}
