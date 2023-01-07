import VarPlugin from "./plugins/var";
import SharedState from "./index";

describe("SharedState", () => {
  let sharedState;

  beforeEach(() => {
    sharedState = new SharedState();
  });

  it("creates a new VarPlugin if no plugins are provided", () => {
    expect(sharedState.plugins.get("")).toBeInstanceOf(VarPlugin);
  });

  it("adds provided plugins to the plugins Map", () => {
    const mockPlugin = class MockPlugin {
      static protocol = "mock";
    };
    sharedState = new SharedState({ plugins: [mockPlugin] });
    expect(sharedState.plugins.get("mock") instanceof mockPlugin).toBe(true);
  });

  it("sets initial state values passed in the constructor", () => {
    sharedState = new SharedState({ initialState: { a: 1, b: 2 } });
    expect(sharedState.getValue("a")).toBe(1);
    expect(sharedState.getValue("b")).toBe(2);
  });

  it("throws an error if a plugin is not found", () => {
    expect(() => sharedState.findPlugin("invalid:url")).toThrow();
  });

  it("creates a new resource if it does not exist", () => {
    const resource = sharedState.getResource("a");
    expect(resource).toBeDefined();
    expect(sharedState.resources.get("a")).toBe(resource);
  });

  it("retrieves an existing resource if it exists", () => {
    const resource = {};
    sharedState.resources.set("a", resource);
    expect(sharedState.getResource("a")).toBe(resource);
  });

  it("returns the value of a resource", () => {
    sharedState.resources.set("a", { value: 1 });
    expect(sharedState.getValue("a")).toBe(1);
  });

  it("sets the value of a resource", () => {
    sharedState.resources.set("a", { setValue: jest.fn() });
    sharedState.setValue("a", 2);
    expect(sharedState.resources.get("a").setValue).toHaveBeenCalledWith(2, {});
  });

  it("deletes a resource", () => {
    const resource = { delete: jest.fn() };
    sharedState.resources.set("a", resource);
    sharedState.deleteResource("a");
    expect(resource.delete).toHaveBeenCalled();
    expect(sharedState.resources.has("a")).toBe(false);
  });

  it("registers a change callback on a resource", () => {
    sharedState.resources.set("a", { onChange: jest.fn() });
    const callback = () => undefined;
    sharedState.onChange("a", callback, {});
    expect(sharedState.resources.get("a").onChange).toHaveBeenCalledWith(
      callback,
      {}
    );
  });
});

describe("proxyHandler", () => {
  let sharedState;

  beforeEach(() => {
    sharedState = new SharedState();
  });

  it("sets the value of a resource", () => {
    sharedState.proxy["a"] = 1;
    expect(sharedState.getValue("a")).toBe(1);
  });

  it("gets the value of a resource", () => {
    sharedState.setValue("a", 1);
    expect(sharedState.proxy["a"]).toBe(1);
  });
  it("deletes a resource", () => {
    sharedState.setValue("a", 1);
    delete sharedState.proxy["a"];
    expect(sharedState.getValue("a")).toBeUndefined();
  });
});
