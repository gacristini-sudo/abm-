import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Hydration-safe "have we mounted on the client" flag without a manual effect + setState.
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
