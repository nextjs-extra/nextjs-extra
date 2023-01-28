import { build } from "./build";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { remove } from "fs-extra";

const cwd = resolve(__dirname, "../test");
const dynamicComponentsTestPath = resolve(cwd, "dynamic-components");

describe("build", () => {
  beforeEach(async () => {
    await remove(dynamicComponentsTestPath);
  });

  it("builds", async () => {
    await build({
      globPattern: "**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}",
      cwd,
      out: "dynamic-components/Components.jsx",
      modules: [
        "eslint", // we can use any module here, it doesn't matter as long as it exists
        "react/jsx-runtime", // we can use any module here, it doesn't matter as long as it exists
        "this-module-does-not-exist",
      ],
    });

    expect(
      await readFile(resolve(cwd, "dynamic-components/Components.jsx"), "utf-8")
    ).toMatchSnapshot();
  });

  afterAll(async () => {
    await remove(dynamicComponentsTestPath);
  });
});
