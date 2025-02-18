import { useState } from "react";

import { LOCAL_KEYS, useLocalStorageState } from "./useLocalStorageState";
import { API, useMockApiState } from "./useMockApiState";

export type EnvMode = "DEFAULT" | "LOCAL_STORAGE" | "API_MOCK";

export type StateType = "PRODUCT" | "COUPON" | "CART_ITEM";

export const useStateByMode = <T>(stateType: StateType, initialValue: T) => {
  const envMode = process.env.REACT_APP_MODE as EnvMode;

  if (envMode === "LOCAL_STORAGE") {
    return useLocalStorageState<T>(LOCAL_KEYS[stateType], initialValue);
  }

  if (envMode === "API_MOCK") {
    return useMockApiState<T>(API[stateType], initialValue);
  }

  return useState(initialValue);
};
