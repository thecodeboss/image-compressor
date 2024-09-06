export function batch<T>(data: T[], batchSize: number): T[][] {
  const result: T[][] = [];

  for (
    let batchIndex = 0;
    batchIndex < Math.ceil(data.length / batchSize);
    batchIndex++
  ) {
    const start = batchIndex * batchSize;
    const end = start + batchSize;

    result.push(data.slice(start, end));
  }

  return result;
}
