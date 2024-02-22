"use client";

import { ShoppingBagIcon } from "@/components/Icons";
import Cart from "@/components/cart/Cart";
import useModalClose from "@/hook/useModalClose";
import { useCartStore } from "@/store/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type CartHeaderContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
};

export function  CartHeaderContainer <T extends React.ElementType = "li">({
  as,
  className = "",
}: Omit<React.ComponentPropsWithoutRef<T>, keyof CartHeaderContainerProps<T>> &
  CartHeaderContainerProps<T>) {
  let Component = as ?? "li";
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useModalClose(setIsOpen, ".dropdown-cart");
  
  // If the pathname change hide the modal:
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const cartStore = useCartStore();

  return (
    <Component className={`relative ${className}`}>
      <button
         onClick={() => setIsOpen(!isOpen)}
        className="dropdown-cart group flex items-center"
      >
        <ShoppingBagIcon width={20} height={20} />
        <span className="ml-2 text-sm font-medium">
          {cartStore.cart.length}
        </span>
      </button>
      <Cart isOpen={isOpen} />
    </Component>
  );
};

export default CartHeaderContainer;
