/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoizedFactory = useRef<T | null>(null);
  const memoizedDeps = useRef<DependencyList | null>(null);

  if (!memoizedDeps.current || !_equals(memoizedDeps.current, _deps)) {
    memoizedFactory.current = factory();
    memoizedDeps.current = _deps;
  }

  return memoizedFactory.current as T;
}
