"use client";

import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { ResetPasswordSchema } from "@/validations/ResetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface URLTokenProps {
  params: { token: string };
}

export default function ResetPassword({ params }: URLTokenProps) {
  const [resetSuccess, setResetSuccess] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof ResetPasswordSchema>> = async (
    data,
  ) => {
    const response = await fetch("/api/auth/reset-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: params.token, password: data.password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error resetting password");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.status === "success") {
          toast.success("Password reset successfully");
          return data;
        } else {
          throw new Error("Error resetting password: " + data?.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  if (resetSuccess) {
    return <p>Password reset successfully!</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-96 flex-col rounded-lg bg-white p-8 shadow-lg"
    >
      <h1 className="mb-8 text-3xl font-bold">Reset Password</h1>
      <Input
        innerRef={register("password")}
        name="password"
        type="password"
        placeholder="New Password"
        errors={errors.password}
      />
      <Input
        innerRef={register("confirmPassword", {
          validate: (value) => {
            return value === watch("password") || "Passwords do not match";
          },
        })}
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        errors={errors.confirmPassword}
      />
      <Button type="submit" className="mt-8">
        Reset Password
      </Button>
    </form>
  );
}
