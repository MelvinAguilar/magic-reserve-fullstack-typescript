"use client";

import Input from "@/components/form/Input";
import { handleApi } from "@/lib/handleApi";
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

  const onSubmit: SubmitHandler<PasswordValues> = async (data) => {
    const { password, passwordCurrent } = data;

    const body = JSON.stringify({ password, passwordCurrent });

    await handleApi("/users/update-password", "PATCH", body).then((data) => {
      if (data?.status === "success") toast.success("Password updated");
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
        className="mt-8 rounded-lg bg-primary px-24 py-3 font-poly text-white transition-all hover:bg-primary-light"
      >
        Save
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
