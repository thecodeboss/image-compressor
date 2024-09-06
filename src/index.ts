import { parseCommandLine } from "@/utils/parseCommandLine";
import { run } from "@/utils/run";
import { summarize } from "./utils/summarize";

const options = parseCommandLine(process.argv.slice(2));
const results = await run(options);
summarize(results);
