import core from "@actions/core";
import fsp from "fs/promises";
import glob from "glob";

const getMeta = (files: string[]): string[] => {
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
};

const main = async () => {
  try {
    const patterns = core.getMultilineInput("patterns", { required: true });
    const root = core.getInput("root") || process.cwd();
    const output = core.getInput("output", { required: true });

    const files = patterns.flatMap((pattern) =>
      glob.sync(pattern, { cwd: root })
    );

    await fsp.writeFile(output, getMeta(files).join("\n"));
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

main();
