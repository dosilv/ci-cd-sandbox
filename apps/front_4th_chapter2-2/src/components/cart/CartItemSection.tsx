import React from "react";
import { CartItem, Coupon } from "../../types";
import { getAppliedDiscount } from "../../models/cart";

import { CartItemCard } from "./CartItemCard.tsx";
import { CartSummarySection } from "./CartSummarySection.tsx";
import { CartCouponSection } from "./CartCouponSection.tsx";
import { SectionHeader } from "../shared/SectionHeader.tsx";

interface Props {
  coupons: Coupon[];
  cart: CartItem[];
  selectedCoupon: Coupon | null;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}

export const CartItemSection = ({
  coupons,
  cart,
  selectedCoupon,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  calculateTotal,
}: Props) => {
  return (
    <div>
      <SectionHeader mb={4}>장바구니 내역</SectionHeader>
      <div className="space-y-2">
        {cart.map((item) => {
          return (
            <CartItemCard
              key={item.product.id}
              item={item}
              appliedDiscount={getAppliedDiscount(item)}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>
      <CartCouponSection
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
      />
      <CartSummarySection {...calculateTotal()} />
    </div>
  );
};

export default React.memo(CartItemSection);
