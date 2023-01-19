import { build } from "./build";
import { watcher } from "./watcher";
import { buildStyle } from "./index";

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
    await buildStyle();
    expect(build).toBeCalledWith({
      globPattern: "**/*.{global,component}.{css,scss}",
      cwd: process.cwd(),
      outStyle: "style.scss",
      outVars: "vars.css",
      variables: {},
    });
  });
  it("calls watcher if watch is true", async () => {
    await buildStyle({ watch: true });
    expect(watcher).toBeCalled();
  });
});
