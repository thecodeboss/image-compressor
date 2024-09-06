import { spawn as _spawn } from "child_process";

interface SpawnResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export async function spawn(
  command: string,
  args: string[]
): Promise<SpawnResult> {
  return new Promise((resolve, reject) => {
    const child = _spawn(command, args);

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data;
    });

    child.stderr.on("data", (data) => {
      stderr += data;
    });

    child.on("close", (exitCode) => {
      resolve({ stdout, stderr, exitCode: exitCode ?? 0 });
    });

    child.on("error", reject);
  });
}
