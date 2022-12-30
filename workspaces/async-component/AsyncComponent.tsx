import { useReducer } from "react";

export interface ComponentPromise extends Promise<any> {
  resolve: (value?: any) => void;
  props: Record<string, any>;
  area: string;
  Component: React.ComponentType<any>;
  key: number | string;
}

/**
 * A set that stores async components.
 */
const children: Set<ComponentPromise> = new Set();

/**
 * A map that stores unique keys and their corresponding async components.
 */
const overrideKeys: Map<string, ComponentPromise> = new Map();

/**
 * A map that stores areas and their corresponding forceUpdate functions.
 */
const areas: Map<string, () => void> = new Map();

/**
 * An object containing the async components, unique keys, and areas for testing purposes.
 */
export const __test__ = {
  children,
  overrideKeys,
  areas,
};

/**
 * A counter for generating keys for async components that do not have unique keys.
 */
let i = 0;

/**
 * Makes the `AsyncComponents` matching the `area` to render the `Component` with the `props` properties plus a `resolve` prop.
 *
 * @param {React.ComponentType} Component - The component to be wrapped.
 * @param {Record<string, any>} props - The props to be passed to the wrapped component.
 * @params {string} props.uniqueKey - A unique key to identify the wrapped component, so only one component with the same unique key is rendered at the same time.
 * @param {string} [area] - The area in which the wrapped component will be rendered.
 *
 * @returns {ComponentPromise} A promise that resolves when the wrapped component calls its `resolve` prop
 */
export function asyncit(
  Component: any,
  props: Record<string, any> = {},
  area = ""
): ComponentPromise {
  let resolve;
  const promise = new Promise((res) => {
    resolve = res;
  }) as ComponentPromise;

  if (props.uniqueKey && overrideKeys.has(props.uniqueKey)) {
    return overrideKeys.get(props.uniqueKey) as ComponentPromise;
  }

  function promiseResolver(value) {
    resolve(value);
    resolve = () => {
      console.warn("You can't call resolve on a resolved promise.");
    };
  }

  promise.resolve = promiseResolver;
  promise.props = props;
  promise.area = area;
  promise.Component = Component;
  promise.key = props.uniqueKey ?? i++;

  if (props.uniqueKey) {
    overrideKeys.set(props.uniqueKey, promise);
  }

  children.add(promise);

  promise.finally(() => {
    children.delete(promise);
    if (props.uniqueKey) {
      overrideKeys.delete(props.uniqueKey);
    }
    areas.get(area)?.();
  });
  areas.get(area)?.();
  return promise;
}

/**
 * A component that renders async components with matching `area` props.
 *
 * @param props - The props of the component.
 * @param {string} [props.area] - The area in which to render async components.
 *
 * @returns A React element that renders async components with matching `area` props.
 */
export function AsyncComponents({ area = "" }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  areas.set(area, forceUpdate);

  return (
    <>
      {Array.from(children).map(
        (promise: any) =>
          area === promise.area && (
            <promise.Component
              key={promise.key}
              {...promise.props}
              resolve={promise.resolve}
            />
          )
      )}
    </>
  );
}
