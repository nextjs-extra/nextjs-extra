# `@next-js-extra/shared-state`

A shared state that uses URL-ish paths to access the values.

It can be used for sharing a state dynamically name-spaced, so following some API-like naming convention, any component can use a few properties to generate the URLs it needs to read and write any related shared value.

## Installation

```bash
npm install @nextjs-extra/shared-state
```

## Basic Usage

Wrap your app with `SharedStateProvider`.

```jsx
import { SharedStateProvider } from "@nextjs-extra/shared-state/react";

export default function App({ Component, pageProps }) {
  return (
    <SharedStateProvider>
      <Component {...pageProps} />
    </SharedStateProvider>
  );
}
```

Use `useDynamicValue` to read and write values.

```jsx
import { useSharedValue } from "@nextjs-extra/shared-state/react";

const [value, setValue] = useDynamicValue("my-value");
```

## Example

- [code]()
- [demo]()

## TypeScript

There is no way to type the paths themselves. If you want to enforce type safety you need to wrap the `useSharedValue` hook with a custom typed hook.

For example:

```ts
import { useSharedValue } from "@nextjs-extra/shared-state/react";

export function useUserName(userId: string) {
  const [userName, setUserName] = useSharedValue(`users/${userId}/name`);

  return [
    userName as string | undefined,
    setUserName as (userName: string) => void,
  ];
}
```

## Advanced Usage

### More hooks

#### useSharedResource

Some times, you need to be able to read and write a value, but you don't want your component to re-render when the value changes.

For those cases you can use `useSharedResource`.

```jsx
import { useSharedResource } from "@nextjs-extra/shared-state/react";

const resource = useSharedResource("my-value");

// read
const value = resource.read();

// write
resource.write("new value");

// subscribe
const unsubscribe = resource.onChange((value) => {
  // do something with the new value
});
```

#### useSharedChange

You can use `useSharedChange` to add a callback that will be called when a value changes.

The subscription will be automatically removed when the component unmounts.

```jsx
import { useSharedChange } from "@nextjs-extra/shared-state/react";

useSharedChange("my-value", (value) => {
  // do something with the new value
});
```

#### useSharedState

If you need to read/write/subscribe to multiple paths, `useSharedState` might be useful.

It gives you access to the whole SharedState.

```jsx
import { useSharedState } from "@nextjs-extra/shared-state/react";

const sharedState = useSharedState();

// read
const value = sharedState.getValue("my-value");

// write
sharedState.setValue("my-value", "new value");

// subscribe
const unsubscribe = sharedState.onChange("my-value", (value) => {
  // do something with the new value
});

// delete
sharedState.deleteResource("my-value");

// get a resource (same resource as you get from useSharedResource)

const resource = sharedState.getResource("my-value");
```

### Provider Options

#### initialState

You can pass an initial state to the provider to initialize the shared state.

```jsx
import { SharedStateProvider } from "@nextjs-extra/shared-state/react";

export default function App({ Component, pageProps }) {
  return (
    <SharedStateProvider initialState={{ "my-value": "initial value", ... }}>
      <Component {...pageProps} />
    </SharedStateProvider>
  );
}
```

#### sharedStateRef

You can pass a JavaScript object to the provider, and the `sharedState` will be attached to it.

```jsx
import { SharedStateProvider } from "@nextjs-extra/shared-state/react";

const clientSideWindow = typeof window !== "undefined" ? window : {};

export default function App({ Component, pageProps }) {
  return (
    <SharedStateProvider sharedStateRef={clientSideWindow}>
      <Component {...pageProps} />
    </SharedStateProvider>
  );
}

/// in the developer tools console

window.sharedState.getValue("my-value");
```

### hook options

The following hooks and methods accept options as the last argument.

- `useSharedValue(path, options)`
- `useSharedResource(path, options)`
- `useSharedChange(path, callback, options)`
- `sharedState.getValue(path, options)`
- `sharedState.setValue(path, value, options)`
- `sharedState.onChange(path, callback, options)`
- `sharedState.getResource(path, options)`

In all cases the options are the same.

#### options.firstValue

This is the value you get when you read a path that doesn't exist yet.

#### options.defaultValue

This is the value you get when you read a path whose value is `undefined`.

You will get this value in any of these two cases:

- the value has been set to `undefined` explicitly
- the value has not been set yet, and no `options.firstValue` has been provided
