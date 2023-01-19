/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { mockedWatcher } from "chokidar";

import { waitAndBuildFactory } from "./waitAndBuild";
import { watcher } from "./watcher";

jest.mock("./waitAndBuild", () => {
  return {
    __esModule: true,
    waitAndBuildFactory: jest.fn(() => "waitAndBuildFunction"),
  };
});

jest.mock("chokidar", () => {
  const mockedWatcher = {
    on: jest.fn(),
  };

  return {
    mockedWatcher,
    watch: jest.fn().mockReturnValue(mockedWatcher),
  };
});
describe("watch", () => {
  it("watches", () => {
    watcher({
      globPattern: "globPattern",
      cwd: "cwd",
      outStyle: "outStyle",
      outVars: "outVars",
      variables: "variables",
    });

    expect(waitAndBuildFactory).toBeCalledWith({
      globPattern: "globPattern",
      cwd: "cwd",
      outStyle: "outStyle",
      outVars: "outVars",
      variables: "variables",
    });

    expect(mockedWatcher.on).toBeCalledWith("add", "waitAndBuildFunction");
    expect(mockedWatcher.on).toBeCalledWith("unlink", "waitAndBuildFunction");
    expect(mockedWatcher.on).toBeCalledWith("change", "waitAndBuildFunction");
  });
});
