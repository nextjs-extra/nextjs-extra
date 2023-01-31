import { build } from "./build/build";
import { watcher } from "./build/watcher";
import { buildDynamiComponents } from "./index";

jest.mock("./build/build", () => ({
  __esModule: true,
  build: jest.fn(),
}));

jest.mock("./build/watcher", () => ({
  __esModule: true,
  watcher: jest.fn(),
}));

describe("build-style", () => {
  it("calls build with the default parameters", async () => {
    await buildDynamiComponents();
    expect(build).toBeCalledWith({
      globPattern: "**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}",
      cwd: process.cwd(),
      out: "Components.jsx",
      modules: [],
    });
  });
  it("calls watcher if watch is true", async () => {
    await buildDynamiComponents({ watch: true });
    expect(watcher).toBeCalled();
  });
});
