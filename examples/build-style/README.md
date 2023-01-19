# build-style example

In `next.config.js` we import `build-style`, and we call it with a few options.

It will create two files `./styles.scss` and `./vars.css`

We need to import those files in `_app.js`.

Any file that matches the glob pattern `**/*.{global,component}.{css,scss}` will be processed by `build-style`.

The `global` ones will be appended directly.

The `component` ones will be wrapped in a custom element selector. For instance `foo-bar` will be wrapped in `foo-bar { .... }`. Remember to use the appropriate tag name (`<foo-bar>`) as top element in your component.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-extra.example) or preview live with [StackBlitz](https://stackblitz.com/github/nextjs-extra/nextjs-extra/tree/main/examples/build-style)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/nextjs-extra/nextjs-extra/tree/main/examples/build-style&project-name=build-style&repository-name=build-style)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/nextjs-extra/nextjs-extra/tree/main/examples/build-style build-style-app
```

```bash
yarn create next-app --https://github.com/nextjs-extra/nextjs-extra/tree/main/examples/build-style build-style-app
```

```bash
pnpm create next-app --https://github.com/nextjs-extra/nextjs-extra/tree/main/examples/build-style build-style-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-extra-example) ([Documentation](https://nextjs.org/docs/deployment)).
