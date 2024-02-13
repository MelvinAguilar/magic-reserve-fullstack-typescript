"use client";

import Input from "@/components/form/Input";
import { PasswordUpdateSchema } from "@/validations/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type PasswordValues = {
  password: string;
  passwordCurrent: string;
};

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof PasswordUpdateSchema>>({
    resolver: zodResolver(PasswordUpdateSchema),
  });

  const onSubmit: SubmitHandler<PasswordValues> = (data) => {
    const token = localStorage.getItem("session");

    if (!token) {
      toast.error("No token found");
      return;
    }

    const { password, passwordCurrent } = data;

    const body = JSON.stringify({ password, passwordCurrent });

    fetch("/api/users/update-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error updating password");
        }

        return res.json();
      })
      .then((data) => {
        if (data?.status === "success") {
          toast.success("Password updated");
        } else {
          toast.error("Error updating password: " + data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[50rem] flex-col rounded-lg bg-white p-8 shadow-lg"
    >
      <Input
        innerRef={register("passwordCurrent")}
        name="passwordCurrent"
        type="password"
        placeholder="Your current password"
        errors={errors.passwordCurrent}
      />
      <Input
        innerRef={register("password")}
        name="password"
        type="password"
        placeholder="Your new password"
        errors={errors.password}
      />

      <button
        type="submit"
        className="bg-primary hover:bg-primary-light mt-8 rounded-lg px-24 py-3 font-poly text-white transition-all"
      >
        Save
      </button>
    </form>
  );
};

export default UpdatePasswordForm;