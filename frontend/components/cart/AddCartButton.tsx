"use client";

import { useCartStore } from "@/store/store";
import { AddCartType } from "@/types";
import { useState } from "react";

export default function AddCartButton({
  name,
  id,
  imageCover,
  price,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addToCart({ id, name, price, quantity, imageCover });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <>
      <button
        disabled={added}
        onClick={handleAddToCart}
        className="mt-8 rounded-lg bg-primary px-24 py-3 font-poly text-white transition-all hover:bg-primary-light"
      >
        {!added && <span>Reserve tour</span>}
        {added && <span>Adding to cart</span>}
      </button>
    </>
  );
}
