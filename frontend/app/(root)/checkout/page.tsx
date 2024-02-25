"use client";

import { LinkComponent } from "@/components/Button";
import { Container } from "@/components/Container";
import { IconMinus, IconPlus, TrashIcon } from "@/components/Icons";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Checkout() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);
  const formattedPrice = formatPrice(totalPrice);
  const formattedTax = formatPrice(totalPrice * 0.01);
  const formattedTotal = formatPrice(totalPrice + totalPrice * 0.01);

  return (
    <Container className="mt-20 flex-1">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>

          <ul
            role="list"
            className="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {cartStore.cart.length === 0 && (
              <li className="flex py-6 sm:py-10">
                <p className="text-gray-500">Your cart is empty</p>
              </li>
            )}
            {cartStore.cart.map((tour) => (
              <li key={tour.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <Image
                    src={tour.imageCover}
                    alt={tour.name}
                    width={96}
                    height={96}
                    quality={65}
                    className="aspect-square size-24 flex-none rounded-md border border-gray-200 object-cover"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-700 hover:text-gray-800">
                          {tour.name}
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <Link
                          href={`/tours/${tour.id}`}
                          className="font-medium text-gray-500"
                        >
                          Show details &rarr;
                        </Link>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        {(tour.maxGroupSize || 0) -
                          (tour.currentGroupSize || 0)}{" "}
                        spots left
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ${tour.price}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-8">
                      <div className="mt-4 sm:mt-0">
                        <label
                          htmlFor={`quantity-${tour.id}`}
                          className="sr-only"
                        >
                          Quantity, {tour.name}
                        </label>
                        <div className="relative flex max-w-[8rem] items-center">
                          <button
                            onClick={() =>
                              cartStore.removeItem({
                                id: tour.id,
                                quantity: tour.quantity,
                              })
                            }
                            type="button"
                            className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200"
                          >
                            <IconMinus className="h-3 w-3" />
                          </button>
                          <input
                            type="text"
                            className="block h-11 w-full border-y border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900"
                            placeholder="1"
                            required
                            value={tour.quantity}
                            readOnly
                          />

                          <button
                            onClick={() => {
                              if (
                                (tour.maxGroupSize || 0) -
                                  (tour.currentGroupSize || 0) >
                                (tour.quantity ?? 0)
                              ) {
                                cartStore.addToCart({ ...tour });
                              } else {
                                toast.error(
                                  "You can't add more than available spots"
                                );
                              }
                            }}
                            type="button"
                            className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200"
                          >
                            <IconPlus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => cartStore.removeFromCart(tour.id)}
                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Remove</span>
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                {formattedPrice}
              </dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <p className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  1 %
                </p>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {formattedTax}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {formattedTotal}
              </dd>
            </div>
          </dl>

          <LinkComponent className="mt-8" href="/checkout/form">
            Checkout
          </LinkComponent>
        </section>
      </div>
    </Container>
  );
}
