import { useImports } from "./useImports";

test("useImports", () => {
  const files = [
    "node_modules/next/dynamic.js",
    "path/ComponentName.dynamic.jsx",
    "path/wrongComponentName.dynamic.tsx",
    "path/Wrong+Component:Name.dynamic.tsx",
  ];

  expect(useImports(files)).toMatchSnapshot();
});
