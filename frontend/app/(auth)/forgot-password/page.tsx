"use client";

import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { handleApi } from "@/lib/handleApi";
import { ForgotPasswordSchema } from "@/validations/ForgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ForgotPassword() {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const storedTime = localStorage.getItem("resetPasswordTime");
    if (storedTime) {
      const remaining = Math.max(
        0,
        60 - Math.floor((Date.now() - parseInt(storedTime, 10)) / 1000),
      );
      setTimeRemaining(remaining);
    }
  }, []);

  const startTimer = () => {
    setTimeRemaining(60);
    localStorage.setItem("resetPasswordTime", Date.now().toString());

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1100);
    
    return () => clearInterval(timer);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordSchema>> = async (
    data,
  ) => {
    await handleApi("/users/forgot-password", "POST", data).then((data) => {
      if (data?.status === "success") {
        toast.success("Email sent with password recovery instructions");
        startTimer();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-96 flex-col rounded-lg bg-white p-8 shadow-lg"
    >
      <h1 className="mb-8 text-3xl font-bold">Forgot Password</h1>
      <Input
        innerRef={register("email")}
        name="email"
        type="email"
        placeholder="Email"
        errors={errors.email}
      />
      <Link href="/sign-in" className="text-blue-500 mt-4">
        Remembered your password? Sign in
      </Link>
      <Button type="submit" className="mt-8 !px-4" disabled={timeRemaining > 0}>
        {timeRemaining > 0
          ? `Retry in ${timeRemaining} seconds`
          : "Send Recovery Email"}
      </Button>
    </form>
  );
}
