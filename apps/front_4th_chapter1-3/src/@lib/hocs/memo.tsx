/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, FunctionComponent, ReactNode } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  if (!isFunctionalComponent<P>(Component)) {
    throw new Error("Component passed to memo should be a function.");
  }

  return (props: P) => {
    const prevProps = useRef<P | null>(null);
    const memoizedComponent = useRef<ReactNode | null>(null);

    if (!memoizedComponent.current || !_equals(props, prevProps.current)) {
      prevProps.current = props;
      memoizedComponent.current = <Component {...props} />;
    }

    return memoizedComponent.current;
  };
}
const isFunctionalComponent = <P,>(
  Component: ComponentType<P>,
): Component is FunctionComponent<P> => typeof Component === "function";
