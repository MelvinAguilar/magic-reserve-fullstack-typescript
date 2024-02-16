"use client";

import Button from "@/components/Button";
import { Title } from "@/components/Title";
import Input from "@/components/form/Input";
import { AuthContext } from "@/context/AuthContext";
import { LoginSchema } from "@/validations/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

export default function SignIn() {
  const { user, login } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (user) {
      toast.error("You are already logged in");
      router.push("/");
    }
  }, [user]);

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    login(data.email, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-96 flex-col rounded-lg bg-white p-8 shadow-lg"
    >
      <Title as="h1" className="mb-8 text-3xl font-bold" >Sign in</Title>
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
      <Link href="/forgot-password" className="text-blue-500 mt-4">
        Forgot your password?
      </Link>
      <p className="mt-8 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </form>
  );
}
