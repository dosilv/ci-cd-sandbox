import { CartItem, Coupon, Product } from "../types";
import mockProducts from "./data/products.json";
import mockCoupons from "./data/coupons.json";
import mockCartItems from "./data/cartItems.json";
import { getHandlers } from "./utils/mockUtil";
import { API } from "../hooks";

export const handlers = [
  ...getHandlers<Product>(API.PRODUCT, mockProducts as Product[]),
  ...getHandlers<Coupon>(API.COUPON, mockCoupons as Coupon[]),
  ...getHandlers<CartItem>(API.CART_ITEM, mockCartItems as CartItem[]),
];
