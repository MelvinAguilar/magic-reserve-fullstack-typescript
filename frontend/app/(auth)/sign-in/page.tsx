"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Input from "@/components/form/Input";
import { LoginSchema } from "@/validations/LoginSchema";
import { useContext } from "react";

type LoginValues = {
  email: string;
  password: string;
};
export default function SignIn() {
  // const { user, login, logout } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    login(data.email, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-96 flex-col rounded-lg bg-white p-8 shadow-lg"
    >
      {user ? <p>Bienvenido, {user.email}</p> : <p>Por favor, inicia sesión</p>}
      <button onClick={logout}>Cerrar sesión</button>

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
      <button type="submit" className="mt-8">
        Sign in
      </button>
      <p className="mt-8 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </form>
  );
};
