import { build } from "./build";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { remove } from "fs-extra";

const cwd = resolve(__dirname, "../test");
const buildStyleTestPath = resolve(cwd, "build-style");

describe("build", () => {
  beforeEach(async () => {
    await remove(buildStyleTestPath);
  });

  it("builds", async () => {
    await build({
      globPattern: "**/*.{global,component}.{css,scss}",
      cwd,
      outStyle: "build-style/style.scss",
      outVars: "build-style/vars.scss",
      variables: {
        "color-background": "#ff0000",
        "secondary-color": "#00ff00",
      },
    });

    expect(
      await readFile(resolve(cwd, "build-style/style.scss"), "utf-8")
    ).toMatchSnapshot();
    expect(
      await readFile(resolve(cwd, "build-style/vars.scss"), "utf-8")
    ).toMatchSnapshot();
  });

  afterAll(async () => {
    await remove(buildStyleTestPath);
  });
});
