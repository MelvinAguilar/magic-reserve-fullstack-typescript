"use client";

import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { AuthContext } from "@/context/AuthContext";
import { LoginSchema } from "@/validations/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function SignIn() {
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    login(data.email, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-96 flex-col rounded-lg bg-white p-8 shadow-lg"
    >
      <h1 className="mb-8 text-3xl font-bold">Sign in</h1>
      <Input
        innerRef={register("email")}
        name="email"
        type="email"
        placeholder="Email"
        errors={errors.email}
      />
      <Input
        innerRef={register("password")}
        name="password"
        type="password"
        placeholder="Password"
        errors={errors.password}
      />
      <Button type="submit" className="mt-8">
        Sign in
      </Button>
      <p className="mt-8 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </form>
  );
}
