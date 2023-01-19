import { build } from "./build";
import { waitAndBuildFactory } from "./waitAndBuild";

jest.mock("./build");

describe("waitAndBuildFactory", () => {
  it("should return a function that calls the build function", async () => {
    const waitAndBuild = waitAndBuildFactory({});
    await waitAndBuild();

    expect(build).toHaveBeenCalled();
  });
});
