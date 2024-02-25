"use client";

import Button from "@/components/Button";
import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import Input from "@/components/form/Input";
import { handleApi } from "@/lib/handleApi";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/store";
import { CheckoutSchema } from "@/validations/CheckoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type CheckoutValues = {
  email: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
};

export default function Checkout() {
  const cartStore = useCartStore();
  const router = useRouter();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  const formattedPrice = formatPrice(totalPrice);
  const formattedTax = formatPrice(totalPrice * 0.01);
  const formattedTotal = formatPrice(totalPrice + totalPrice * 0.01);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit: SubmitHandler<CheckoutValues> = async (data) => {
    // The data from the form is not used in this page
    if (cartStore.cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const reservation = {
      tours: cartStore.cart.map((tour) => {
        return {
          tour: tour.id,
          quantity: tour.quantity,
          unitPrice: tour.price,
          subtotal: tour.price * tour.quantity!,
        };
      }),
      total: totalPrice + totalPrice * 0.01,
    };

    await handleApi("/reservations", "POST", reservation).then((data) => {
      if (data?.status === "success") {
        toast.success("Reservation created successfully");
        cartStore.clearCart();
        router.push("/checkout/success");
      }
    });
  };

  const generateRandomCheckout = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substring(2);

    setValue(
      "email",
      Math.random().toString(36).substring(2, 9) + "@gmail.com",
    );
    setValue(
      "cardNumber",
      Math.floor(Math.random() * 1e16)
        .toString()
        .padStart(16, "0"),
    );
    setValue("expirationDate", month.toString().padStart(2, "0") + "/" + year);
    setValue(
      "cvc",
      Math.floor(Math.random() * 1e3)
        .toString()
        .padStart(3, "0"),
    );
    setValue("address", Math.random().toString(36).substring(2, 9));
    setValue("city", Math.random().toString(36).substring(2, 9));
    setValue("region", Math.random().toString(36).substring(2, 9));
    setValue(
      "postalCode",
      Math.floor(Math.random() * 1e5)
        .toString()
        .padStart(5, "0"),
    );
  };

  return (
    <Container className=" grid !p-0 lg:grid-cols-2 !pt-6">
      <h1 className="sr-only">Checkout</h1>

      <section className="bg-primary px-8 py-12 pt-20 text-white md:px-10 lg:col-start-2 lg:row-start-1">
        <h2 className="sr-only">Order summary</h2>

        <dl>
          <dt className="text-sm font-medium">Amount due</dt>
          <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
            {formattedTotal}
          </dd>
        </dl>

        <ul
          role="list"
          className="mt-8 divide-y divide-white divide-opacity-10 text-sm font-medium"
        >
          {cartStore.cart.map((tour) => (
            <li key={tour.id} className="flex items-start space-x-4 py-6">
              <Image
                src={tour.imageCover}
                alt={tour.name}
                width={96}
                height={96}
                quality={65}
                className="aspect-square size-24 flex-none rounded-md border border-gray-200 object-cover"
              />
              <div className="flex-auto space-y-1">
                <h3 className="text-white">{tour.name}</h3>
                <p> Unit price: {formatPrice(tour.price)}</p>
                <p> Quantity: {tour.quantity}</p>
              </div>
              <p className="flex-none text-base font-medium text-white">
                {formatPrice(tour.price * tour.quantity!)}
              </p>
            </li>
          ))}
        </ul>

        <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
          <div className="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd> {formattedPrice}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt>Taxes (1%)</dt>
            <dd>{formattedTax}</dd>
          </div>

          <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
            <dt className="text-base">Total</dt>
            <dd className="text-base">{formattedTotal}</dd>
          </div>
        </dl>
      </section>

      <section className="px-8 py-16 pt-20 lg:col-start-1 lg:row-start-1">
        <h2 className="sr-only">Payment and shipping details</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 lg:px-0">
            <div>
              <Title as="h2" small>
                Contact information
              </Title>

              <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <Input
                  innerRef={register("email")}
                  type="email"
                  id="email-address"
                  name="email"
                  className="!mt-2"
                  errors={errors.email}
                />
              </div>
            </div>

            <div className="mt-10">
              <Title as="h1" small>
                Payment details
              </Title>

              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <Input
                    innerRef={register("cardNumber")}
                    type="text"
                    id="card-number"
                    name="card-number"
                    className="!mt-2"
                    errors={errors.cardNumber}
                  />
                </div>

                <div className="col-span-2 sm:col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <Input
                    innerRef={register("expirationDate")}
                    type="text"
                    id="expiration-date"
                    name="expiration-date"
                    className="!mt-2"
                    errors={errors.expirationDate}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <Input
                    innerRef={register("cvc")}
                    type="text"
                    id="cvc"
                    name="cvc"
                    className="!mt-2"
                    errors={errors.cvc}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Title as="h2" small>
                Shipping address
              </Title>

              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Input
                    innerRef={register("address")}
                    type="text"
                    id="address"
                    name="address"
                    className="!mt-2"
                    errors={errors.address}
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <Input
                    innerRef={register("city")}
                    type="text"
                    id="city"
                    name="city"
                    className="!mt-2"
                    errors={errors.city}
                  />
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <Input
                    innerRef={register("region")}
                    type="text"
                    id="region"
                    name="region"
                    className="!mt-2"
                    errors={errors.region}
                  />
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <Input
                    innerRef={register("postalCode")}
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    className="!mt-2"
                    errors={errors.postalCode}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-end gap-4 border-t border-gray-200 pt-6">
              <Button onClick={generateRandomCheckout} type="button">
                Generate random checkout
              </Button>
              <Button type="submit">Pay now</Button>
            </div>
          </div>
        </form>
      </section>
    </Container>
  );
}
