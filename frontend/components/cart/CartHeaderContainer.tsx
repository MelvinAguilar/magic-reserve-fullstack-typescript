"use client";

import { ShoppingBagIcon } from "@/components/Icons";
import Cart from "@/components/cart/Cart";
import { useCartStore } from "@/store/store";

const CartHeaderContainer = () => {
  const cartStore = useCartStore();

  return (
    <li className="relative">
      <button
        onClick={() => cartStore.toggleCart()}
        className="dropdown-cart group flex items-center"
      >
        <ShoppingBagIcon width={20} height={20} />
        <span className="ml-2 text-sm font-medium">
          {cartStore.cart.length}
        </span>
      </button>
      <Cart />
    </li>
  );
};

export default CartHeaderContainer;
