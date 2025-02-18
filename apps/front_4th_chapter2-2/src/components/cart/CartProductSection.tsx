import React from "react";
import { CartItem, Product } from "../../types";

import { getMaxDiscount, getRemainingStock } from "../../models/cart.ts";
import { CartProductCard } from "./CartProductCard.tsx";
import { SectionHeader } from "../shared/SectionHeader.tsx";

interface Props {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const CartProductSection = ({ products, cart, addToCart }: Props) => {
  return (
    <div>
      <SectionHeader mb={4}>장바구니 목록</SectionHeader>
      <div className="space-y-2">
        {products.map((product) => (
          <CartProductCard
            key={product.id}
            product={product}
            remainingStock={getRemainingStock(cart, product)}
            maxDiscount={getMaxDiscount(product.discounts)}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CartProductSection);
