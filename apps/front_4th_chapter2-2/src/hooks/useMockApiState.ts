import { apiUtil } from "../utils";
import { useEffect, useState } from "react";

export const API = Object.freeze({
  PRODUCT: "/products",
  COUPON: "/coupons",
  CART_ITEM: "/cart-items",
});

export const useMockApiState = <T>(api: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => initialValue);

  useEffect(() => {
    initState(api);
  }, []);

  const initState = async (api: string) => {
    const data = await apiUtil.get<T>(api);
    setState(data);
  };

  const updateState = async (updater: (prevState: T) => T) => {
    const updatedState = await apiUtil.put<T>(api, updater(state));
    setState(updatedState);
  };

  return [state, updateState] as const;
};
