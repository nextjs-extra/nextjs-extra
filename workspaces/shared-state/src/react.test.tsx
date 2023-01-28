import { useState } from "react";
import { render, act } from "@testing-library/react";
import {
  SharedStateProvider,
  useSharedValue,
  useSharedResource,
  useSharedState,
  useSharedChange,
  clientSide,
} from "./react";
import SharedState from ".";
import { VarResource } from "./plugins/var";

describe("SharedStateProvider", () => {
  it("should create a new shared state and provide it to the context", () => {
    let testSharedState: SharedState | undefined;
    const TestComponent = () => {
      const sharedState = useSharedState();
      testSharedState = sharedState;
      return <div />;
    };

    render(
      <SharedStateProvider>
        <TestComponent />
      </SharedStateProvider>
    );

    expect(testSharedState instanceof SharedState).toBe(true);
  });

  it("should set the initial state of the shared state", () => {
    const TestComponent = () => {
      const [value] = useSharedValue("test");
      return <div>{value}</div>;
    };

    const { getByText } = render(
      <SharedStateProvider initialState={{ test: "initial value" }}>
        <TestComponent />
      </SharedStateProvider>
    );

    expect(getByText("initial value")).toBeInTheDocument();
  });
});

describe("useSharedValue", () => {
  it("should update the value when the resource value changes", () => {
    const TestComponent = () => {
      const [value, setValue] = useSharedValue("test");
      return (
        <div>
          {value}
          <button onClick={() => setValue("new value")}>Update Value</button>
        </div>
      );
    };

    const { getByText } = render(
      <SharedStateProvider>
        <TestComponent />
      </SharedStateProvider>
    );

    act(() => {
      getByText("Update Value").click();
    });

    expect(getByText("new value")).toBeInTheDocument();
  });
});

describe("useSharedResource", () => {
  it("should return the resource from the shared state", () => {
    const TestComponent = () => {
      const resource = useSharedResource("test");
      return <div>{resource instanceof VarResource ? "true" : "false"}</div>;
    };

    const { getByText } = render(
      <SharedStateProvider>
        <TestComponent />
      </SharedStateProvider>
    );

    expect(getByText("true")).toBeInTheDocument();
  });
});

describe("useSharedChange", () => {
  it("should register a change callback for the given resource", () => {
    const TestComponent = () => {
      const [value, setValue] = useState(0);
      useSharedChange("test", () => setValue((prev) => prev + 1));
      return <div>{value}</div>;
    };

    const { getByText } = render(
      <SharedStateProvider>
        <TestComponent />
      </SharedStateProvider>
    );

    act(() => {
      clientSide.sharedState.setValue("test", "new value");
    });

    expect(getByText("1")).toBeInTheDocument();
  });
});

describe("SharedStateProvider", () => {
  it("should create a shared state instance with the given plugins and initial state", () => {
    const TestComponent = () => {
      const sharedState = useSharedState();
      return <div>{sharedState instanceof SharedState ? "true" : "false"}</div>;
    };

    const { getByText } = render(
      <SharedStateProvider initialState={{ test: "initial value" }}>
        <TestComponent />
      </SharedStateProvider>
    );

    expect(getByText("true")).toBeInTheDocument();
    expect(clientSide.sharedState.getValue("test")).toBe("initial value");
  });

  it("adds sharedState to sharedStateRef", () => {
    const sharedStateRef = { sharedState: undefined };
    const sharedStateReadyHandler = jest.fn();
    global.window.addEventListener("sharedStateReady", sharedStateReadyHandler);
    let testSharedState: SharedState | undefined;
    const TestComponent = () => {
      const sharedState = useSharedState();
      testSharedState = sharedState;
      return <div />;
    };

    render(
      <SharedStateProvider
        initialState={{ test: "initial value" }}
        sharedStateRef={sharedStateRef}
      >
        <TestComponent />
      </SharedStateProvider>
    );

    expect(sharedStateReadyHandler).toBeCalledTimes(1);
    expect(testSharedState).toBe(sharedStateRef.sharedState);
  });
});
