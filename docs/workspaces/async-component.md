## :toolbox: Functions

- [asyncit](#gear-asyncit)
- [AsyncComponents](#gear-asynccomponents)

### :gear: asyncit

Makes the `AsyncComponents` matching the `area` to render the `Component` with the `props` properties plus a `resolve` prop.

| Function  | Type                                                                               |
| --------- | ---------------------------------------------------------------------------------- |
| `asyncit` | `(Component: any, props?: Record<string, any>, area?: string) => ComponentPromise` |

Parameters:

- `Component`: - The component to be wrapped.
- `props`: - The props to be passed to the wrapped component.
- `area`: - The area in which the wrapped component will be rendered.

### :gear: AsyncComponents

A component that renders async components with matching `area` props.

| Function          | Type                                        |
| ----------------- | ------------------------------------------- |
| `AsyncComponents` | `({ area }: { area?: string; }) => Element` |

Parameters:

- `props`: - The props of the component.
- `props.area`: - The area in which to render async components.

## :wrench: Constants

- [**test**](#gear-__test__)

### :gear: **test**

An object containing the async components, unique keys, and areas for testing purposes.

| Constant   | Type                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| `__test__` | `{ children: Set<ComponentPromise>; overrideKeys: Map<string, ComponentPromise>; areas: Map<string, () => void>; }` |
