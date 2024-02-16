"use client";

import { AuthContext } from "@/context/AuthContext";
import useModalClose from "@/hook/useModalClose";
import { useCartStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";
import Button from "../Button";

export default function Cart() {
  const cartStore = useCartStore();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useModalClose(() => cartStore.closeCart(), ".dropdown-cart");
  const handleCheckoutClick = () => {
    if (!user) {
      toast.error("You need to be logged in to checkout");
      return router.push("/sign-in");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div
      className={`dropdown-cart absolute right-0 top-auto z-50 my-4 w-[450px] divide-y divide-gray-100
       rounded-lg bg-white shadow-lg ${cartStore.isOpen ? "block" : "hidden"}`}
    >
      <h2 className="sr-only">Shopping Cart</h2>

      <div className="w-full p-4">
        <ul role="list" className="divide-y divide-gray-200">
          {cartStore.cart.length === 0 && (
            <li className="py-6">
              <p className="text-center text-gray-500">Your cart is empty</p>
            </li>
          )}
          {cartStore.cart.map((product) => (
            <li key={product.id} className="flex pb-4">
              <Image
                src={product.imageCover}
                alt={product.name}
                width={112}
                height={112}
                quality={65}
                className="aspect-square size-28 flex-none rounded-md border border-gray-200 object-cover"
              />
              <div className="ml-4 flex flex-auto flex-col py-1">
                <div className="flex justify-between gap-4">
                  <h3 className="font-medium">
                    <Link href={product.id}>{product.name}</Link>
                  </h3>
                  <p className="">${product.price}</p>
                </div>
                <Link href={product.id} className="block font-medium underline">
                  See details
                </Link>
                <div className="mt-auto flex justify-between gap-4">
                  <p className="text-gray-500">
                    Qty <span>{product.quantity}</span>
                  </p>
                  <button
                    onClick={() =>
                      cartStore.removeItem({
                        id: product.id,
                        quantity: product.quantity,
                      })
                    }
                    className="text-rose-900"
                  >
                    Remove one
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button onClick={handleCheckoutClick} className="mt-4">
          Checkout
        </Button>
      </div>
    </div>
  );
}
