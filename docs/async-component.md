# ` @next-js-extra/async-component`

It mounts a component and returns a promise that resolves when the component
closes.

A clear use case are confirmation dialogs and prompt dialogs.

Other use cases are modals, popups, menus, toasts.

Even if you don't need to get a response or to know when the component is
closed, it might be easier to use this function to mount the component, instead
of using state and conditional rendering.

## Installation

```bash
npm install @nextjs-extra/async-component
```

## Basic Usage

Add a `AsyncComponents` component to `_app.js`

```jsx
<AsyncComponents />
```

Call `asyncit` to mount a component.

```jsx
const response = await asyncit({
  component: Prompt,
  props: { question: "What is your name?" },
});
```

## Example

- [code](https://github.com/nextjs-extra/nextjs-extra/tree/main/examples/async-component)
- [demo](https://stackblitz.com/github/nextjs-extra/nextjs-extra/tree/main/examples/async-component)

## Advanced Usage

### Areas

You can use the property `area` to specify different areas for the async components.

```jsx
<AsyncComponents area="modals">
...
<AsyncComponents area="toast" />
```

```jsx
const name = await asyncit({
  component: Prompt,
  props: { question: "What is your name?" },
  area: "modals",
});

asyncit({
  component: Toast,
  props: { text: `Your name is ${name}` },
  area: "toast",
});
```

### `uniqueKey` to Avoid duplications

You can use the component property `uniqueKey` to make sure that only one component with the same key is mounted at the same time

```jsx
asyncit({
    component: Welcome,
    props: { uniqueKey: : 'wellcome' },
})
```

### resolve

You can force-resolve the promise from the caller, by calling the `resolve` method.

```jsx
const promise = asyncit({
  component: SomeComponent,
  props: someProps,
});

setTimeout(() => {
  promise.resolve("some value");
}, 50000);

const value = await promise;
```
