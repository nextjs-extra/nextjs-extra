import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import { asyncit, AsyncComponents, __test__ } from "./AsyncComponent";

let testComponentResolve;
const TestComponent = ({ n, resolve }) => {
  testComponentResolve = resolve;
  return <div>Test component {n}</div>;
};

describe("AsyncComponents", () => {
  beforeEach(() => {
    __test__.children.clear();
    __test__.overrideKeys.clear();
    __test__.areas.clear();
    cleanup();
  });

  it("renders async components correctly", () => {
    act(() => {
      asyncit(TestComponent, { n: 1 }, "test-area");
    });

    const { getByText, queryByText } = render(
      <AsyncComponents area="test-area" />
    );

    expect(getByText("Test component 1")).toBeInTheDocument();
    expect(queryByText("Test component 2")).toBeNull();

    act(() => {
      asyncit(TestComponent, { n: 2 }, "test-area");
    });

    expect(getByText("Test component 2")).toBeInTheDocument();
  });

  it("renders only one component with the same unique key", () => {
    act(() => {
      asyncit(TestComponent, { uniqueKey: "test-key", n: 1 }, "test-area");
      asyncit(TestComponent, { uniqueKey: "test-key", n: 2 }, "test-area");
    });

    const { getByText, queryByText } = render(
      <AsyncComponents area="test-area" />
    );

    expect(getByText("Test component 1")).toBeInTheDocument();
    expect(queryByText("Test component 2")).toBeNull();
  });

  it("removes async components from the children set when they resolve", async () => {
    const response = asyncit(
      TestComponent,
      { uniqueKey: "unique" },
      "test-area"
    );

    expect(__test__.children.size).toBe(1);

    render(<AsyncComponents area="test-area" />);

    await act(async () => {
      testComponentResolve("Resolved");
      expect(await response).toBe("Resolved");
    });

    expect(__test__.children.size).toBe(0);
  });

  it("is safe to resolve or reject multiple times", async () => {
    jest.spyOn(console, "warn").mockImplementation(() => undefined);

    render(<AsyncComponents area="test-area" />);
    await act(async () => {
      const promise = asyncit(
        TestComponent,
        { uniqueKey: "unique" },
        "test-area"
      );
      promise.resolve("Resolved");
      expect(console.warn).toHaveBeenCalledTimes(0);
      promise.resolve("Resolved");
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(
        "You can't call resolve on a resolved promise."
      );

      await promise;
    });
  });
});
