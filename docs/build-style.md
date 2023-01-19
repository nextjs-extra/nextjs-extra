# `nextjs-extra/build-style`

It takes all the files matching the pattern `**/*.{global,component}.{css,scss}` and generates a single file `./style.scss` with all the styles, and a file `./vars.css` with all the CSS variables.

## Why

This library is one of the most opinionated ones, and I think it's important to add this why section.

The goal is to make it easier to just write CSS and SCSS, without worrying about collisions, variables and imports.

If you need to change styles globally, you drop a `*.global.scss` anywhere, and you don't need to import it.

If you want to style any `FooBar` component, you drop a `foo-bar.component.scss` anywhere (ideally next to the component), and you don't need to import it. You just need the root tag of the component to be `<foo-bar>`.

You will get a `./style.scss` you can import from `_app.js`, and for your convenience also you will get a `./vars.css` with all the CSS variables used in all your global and component styles.

## Installation

```bash
npm install @nextjs-extra/build-style
```

## Basic Usage

In `next.config.js`:

```js
// next.config.js
const buildStyle = require("@nextjs-extra/build-style");

module.exports = async function () {
  await buildStyle();

  return {
    // your next config
  };
};
```

In `_app.js`:

```js
import "../styles.scss";
import "../vars.css";
```

Create files `somename.global.scss` or `somename.global.css` for those rules that are not scoped to a component.

Create files `some-component-name.component.scss` or `some-component-name.component.css` for those rules that are scoped to a component. At least one dash is required in the file name, because custom elements require a dash in the name.

## Example

- [code](https://github.com/nextjs-extra/nextjs-extra/tree/main/examples/build-style)
- [demo](https://stackblitz.com/github/nextjs-extra/nextjs-extra/tree/main/examples/build-style)

## Advanced Usage

You can configure the glob pattern to match your files, the output files, the working directory, and the CSS variables file.

### Options

#### `globPattern`

Type: `string`
Default: `"**/*.{global,component}.{css,scss}"`

The glob pattern to match your files.

#### `outStyle`

Type: `string`
Default: `"./style.scss"`

The output file for the styles.

#### `outVars`

Type: `string`
Default: `"./vars.css"`

The output file for the CSS variables.

#### `cwd`

Type: `string`
Default: the result of `process.cwd()`

The working directory.

#### `variables`

Type: `object`
Default: `{}`

The CSS variables to use in the styles. (_Don't prefix them with_ `--`)

#### watch mode

You can pass the option `watch: true` to watch for changes in the files matching the glob pattern.

I recommend to use `watch: process.env.NODE_ENV === "development"`.

### Example with all options

```js
// next.config.js
const buildStyle = require("@nextjs-extra/build-style");
const { join } = require("path");

module.exports = async function () {
  await buildStyle({
    globPattern: "**/*.{global,component}.{css,scss}",
    outStyle: "./style.scss",
    outVars: "./vars.css",
    cwd: join(process.cwd(), "src"),
    variables: {
      "primary-color": "#ff0000",
      "secondary-color": "#00ff00",
    },
    watch: process.env.NODE_ENV === "development",
  });

  return {
    // your next config
  };
};
```
