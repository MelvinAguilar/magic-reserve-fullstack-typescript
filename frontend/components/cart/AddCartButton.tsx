"use client";

import { useCartStore } from "@/store/store";
import { AddCartType } from "@/types";
import { useState } from "react";
import Button from "../Button";

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
      <Button
        disabled={added}
        onClick={handleAddToCart}
        className="mt-8"
      >
        {!added && <span>Reserve tour</span>}
        {added && <span>Adding to cart</span>}
      </Button>
  );
}
