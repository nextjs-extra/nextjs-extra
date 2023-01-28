import { build } from "./build";
import { watcher } from "./watcher";
import { buildDynamicomponents } from "./index";

jest.mock("./build", () => ({
  __esModule: true,
  build: jest.fn(),
}));

jest.mock("./watcher", () => ({
  __esModule: true,
  watcher: jest.fn(),
}));

describe("build-style", () => {
  it("calls build with the default parameters", async () => {
    await buildDynamicomponents();
    expect(build).toBeCalledWith({
      globPattern: "**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}",
      cwd: process.cwd(),
      out: "Components.jsx",
      modules: [],
    });
  });
  it("calls watcher if watch is true", async () => {
    await buildDynamicomponents({ watch: true });
    expect(watcher).toBeCalled();
  });
});
