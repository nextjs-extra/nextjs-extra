import { useModules } from "./useModules";

test("useModules", () => {
  const modules = ["eslint", "react/jsx-runtime", "this-module-does-not-exist"];

  expect(useModules(modules)).toMatchSnapshot();
});
