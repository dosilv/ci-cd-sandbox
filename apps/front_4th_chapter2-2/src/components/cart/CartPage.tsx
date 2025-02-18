import { Coupon, Product } from "../../types";
import { useCart } from "../../hooks";
import CartItemSection from "./CartItemSection";
import CartProductSection from "./CartProductSection";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CartProductSection
          products={products}
          cart={cart}
          addToCart={addToCart}
        />
        <CartItemSection
          coupons={coupons}
          cart={cart}
          selectedCoupon={selectedCoupon}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          applyCoupon={applyCoupon}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
