import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  createElement,
} from "react";

import SharedState from "./index";

export const ContextState = createContext<SharedState>(new SharedState());

export const clientSide: Record<string, any> = {};

interface StateProviderParams {
  children: any;
  plugins?: any[];
  initialState?: any;
  sharedStateRef?: any;
}

export function SharedStateProvider({
  children,
  plugins = [],
  initialState,
  sharedStateRef,
}: StateProviderParams) {
  const value = useMemo(() => {
    const sharedState = new SharedState({ plugins, initialState });
    clientSide.sharedState = sharedState;
    if (sharedStateRef) {
      sharedStateRef.sharedState = sharedState;

      if (typeof window === "object") {
        (window as Window).dispatchEvent(new Event("sharedStateReady"));
      }
      if (typeof parent === "object") {
        (parent as Window).postMessage("sharedStateReady", "*");
      }
    }

    return sharedState;
  }, []);

  useEffect(() => {
    if (initialState) {
      Object.entries(initialState).forEach(([key, v]) => {
        value.setValue(key, v);
      });
    }
  }, [value, initialState]);

  return createElement(ContextState.Provider, { value }, children);
}

export function useSharedValue(
  resource: any,
  options?: null | Record<string, any>
) {
  resource = useSharedResource(resource, options);

  const [value, set] = useState(resource.value);

  useEffect(() => {
    set(resource.value);
  }, [resource]);

  useSharedChange(resource.url, (value) => set(value), null);

  const setValue = useCallback(
    (newValue) => resource.setValue(newValue),
    [resource]
  );

  const response = [value, setValue, resource] as any;
  response.value = value;
  response.setValue = setValue;
  response.resource = resource;

  return response;
}

export function useSharedResource(url: string, options?: any) {
  const sharedState: SharedState = useContext(ContextState);
  return sharedState.getResource(url, options);
}

export function useSharedChange(url, callback, options?) {
  const sharedState: Record<string, any> = useContext(ContextState);

  useEffect(
    () => url && sharedState.onChange(url, callback, options),
    [url, callback, options, sharedState]
  );
}

export function useSharedState(): SharedState {
  return useContext(ContextState) as SharedState;
}
