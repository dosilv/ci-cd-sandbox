import { useState } from "react";
import { localStorageUtil } from "../utils";

export const LOCAL_KEYS = Object.freeze({
  COUPON: "coupon_key",
  PRODUCT: "product_key",
  CART_ITEM: "cart_item_key",
});

export const useLocalStorageState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(
    () => localStorageUtil.get<T>(key) ?? initialValue,
  );

  const updateState = async (updater: (prevState: T) => T) => {
    localStorageUtil.set<T>(key, updater(state));
    const updatedState = localStorageUtil.get<T>(key);

    if (!updatedState) {
      throw Error("Updated state is not found.");
    }

    setState(updatedState);
  };

  return [state, updateState] as const;
};
