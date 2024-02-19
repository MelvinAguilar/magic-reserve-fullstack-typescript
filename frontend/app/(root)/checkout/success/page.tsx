import { Title } from "@/components/Title";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <p className="mb-4 text-xl text-blue-500">Thank you for your order!</p>
      <Title>Your order has been placed successfully</Title>
      <p className="text-lg">You will receive an email confirmation shortly.</p>
    </div>
  );
};

export default SuccessPage;
