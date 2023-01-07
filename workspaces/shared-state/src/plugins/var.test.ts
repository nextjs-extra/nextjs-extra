import VarPlugin, { VarResource } from "./var";

describe("VarResource", () => {
  let plugin;
  let resource;

  beforeEach(() => {
    plugin = new VarPlugin();
    resource = plugin.newResource("a", { firstValue: 1, defaultValue: 0 });
  });

  test("sets the value of the resource", () => {
    resource.setValue(2);
    expect(resource.cached).toBe(2);
  });

  test("gets the value of the resource", () => {
    expect(resource.getValue()).toBe(1);
  });

  test("gets the default value of the resource if no value has been set", () => {
    resource.cached = undefined;
    expect(resource.getValue()).toBe(0);
  });

  test("triggers subscriptions to the resource", () => {
    const subscription1 = jest.fn();
    const subscription2 = jest.fn();
    resource.subscriptions.set(0, subscription1);
    resource.subscriptions.set(1, subscription2);
    resource.triggerSubscriptions();
    expect(subscription1).toHaveBeenCalledWith(1, resource);
    expect(subscription2).toHaveBeenCalledWith(1, resource);
  });

  test("gets the value of the resource using the value getter", () => {
    expect(resource.value).toBe(1);
  });

  test("sets the value of the resource using the value setter", () => {
    resource.value = 2;
    expect(resource.cached).toBe(2);
  });

  test("registers a change callback on the resource", () => {
    const unsubscribe = resource.onChange(() => undefined);
    expect(typeof unsubscribe).toBe("function");
  });
});

describe("VarPlugin", () => {
  let plugin;

  beforeEach(() => {
    plugin = new VarPlugin();
  });

  test("creates a new VarResource", () => {
    const options = { firstValue: 1, defaultValue: 0 };
    const resource = plugin.newResource("var:a", options);
    expect(resource).toBeInstanceOf(VarResource);
    expect(resource.url).toBe("var:a");
    expect(resource.cached).toBe(1);
    expect(resource.defaultValue).toBe(0);
  });
});
