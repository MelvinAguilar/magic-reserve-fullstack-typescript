"use client";

import { ShoppingBagIcon } from "@/components/Icons";
import Cart from "@/components/cart/Cart";
import { useCartStore } from "@/store/store";
import { AuthContext } from "@/context/AuthContext";
import useModalClose from "@/hook/useModalClose";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const CartHeaderContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useModalClose(setIsOpen, ".dropdown-cart");
  
  // If the pathname change hide the modal:
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const cartStore = useCartStore();

  return (
    <li className="relative">
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
    </li>
  );
};

export default CartHeaderContainer;
