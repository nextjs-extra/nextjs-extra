# `nextjs-extra/dynamic-components`

If you need to go beyond the usual conditional rendering, you can use this module that gives you an abstract component, capable of rendering any other component or html element, based on the props you pass to it.

## Installation

```bash
npm install @nextjs-extra/dynamic-components
```

## Basic Usage

### Configuration

In `next.config.js`:

```js
// next.config.js

const { buildDynamiComponents } = require("@nextjs-extra/dynamic-components");

module.exports = async function () {
  await buildDynamiComponents();

  return {
    // your next config
  };
};
```

### Define your dynamic components

Anywhere in your file structure:

Export as default your dynamic components from files named `SomeComponentName.dynamix.jsx` (or `tsx`)

### Use your dynamic components

A `Components.jsx` file will be created in the root of your project. You can import it and use it anywhere in your project.

```js
import { DComponent } from "../Components";

export default function MyPage() {
  return (
    <div>
      <DComponent type="SomeComponentName" props={{ foo: "bar" }} />
    </div>
  );
}
```

I know there is no point in hardcoding the type and the props this way. This is just an example.

## Example

- [code](https://github.com/nextjs-extra/nextjs-extra/tree/main/examples/dynamic-components)
- [demo](https://stackblitz.com/github/nextjs-extra/nextjs-extra/tree/main/examples/dynamic-components)

## Advanced Usage

You can configure the glob pattern, the output file, and the working directory.

### Options

#### `globPattern`

Type: `string`
Default: `""**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}"`

The glob pattern to match your files.

#### `out`

Type: `string`
Default: `"Components.jsx"`

The output file for the styles.

#### `cwd`

Type: `string`
Default: the result of `process.cwd()`

The working directory.

#### watch mode

You can pass the option `watch: true` to watch for changes in the files matching the glob pattern.

I recommend to use `watch: process.env.NODE_ENV === "development"`.

### Example with all options

```js
// next.config.js
const { buildStyle } = require("@nextjs-extra/build-style");
const { join } = require("path");

module.exports = async function () {
  await buildStyle({
    globPattern: "**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}",
    out: "Components.jsx",
    cwd: join(process.cwd(), "src"),
    watch: process.env.NODE_ENV === "development",
  });

  return {
    // your next config
  };
};
```
