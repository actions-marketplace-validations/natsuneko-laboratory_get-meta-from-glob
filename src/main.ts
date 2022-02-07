import { getInput, getMultilineInput, setFailed } from "@actions/core";
import fsp from "fs/promises";
import glob from "glob";

function getMeta(files: string[]): string[] {
  const meta = files
    .filter((w) => !w.endsWith(".meta"))
    .flatMap((w) => {
      const paths = w.split("/");
      const hierarchies: string[] = [];

      return paths.map((w) => {
        const path = [...hierarchies, w].join("/");
        hierarchies.push(w);

        return `${path}.meta`;
      });
    });

  return Array.from<string>(new Set<string>(meta)).filter(
    (w) => w !== "Assets.meta"
  );
}

async function main() {
  try {
    const patterns = getMultilineInput("patterns", { required: true });
    const root = getInput("root") || process.cwd();
    const output = getInput("output", { required: true });

    const files = patterns.flatMap((pattern) =>
      glob.sync(pattern, { cwd: root })
    );

    await fsp.writeFile(output, getMeta(files).join("\n"));
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
  }
}

main();
