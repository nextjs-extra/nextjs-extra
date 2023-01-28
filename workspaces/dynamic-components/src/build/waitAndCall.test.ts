import { waitAndCallFactory } from "./waitAndCall";

describe("waitAndCallFactory", () => {
  it("should wait for a pending call to complete before calling the factory function", async () => {
    const fn = jest.fn(
      () => new Promise((resolve) => setTimeout(() => resolve(undefined), 100))
    );

    const waitAndCall = waitAndCallFactory(fn);

    const promise1 = waitAndCall();
    const promise2 = waitAndCall();

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(fn).toHaveBeenCalledTimes(1);

    await promise1;
    await promise2;
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should return the value of the factory function", async () => {
    const fn = jest.fn(() => Promise.resolve("test"));

    const waitAndCall = waitAndCallFactory(fn);
    const result = await waitAndCall();
    expect(result).toBe("test");
  });
});
