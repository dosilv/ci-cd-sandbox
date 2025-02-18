import { Coupon } from "../types";
import { useStateByMode } from "./useStateByMode";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useStateByMode<Coupon[]>(
    "COUPON",
    initialCoupons,
  );

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
