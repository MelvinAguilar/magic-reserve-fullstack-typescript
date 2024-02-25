"use client";

import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { AuthContext } from "@/context/AuthContext";
import { handleApi } from "@/lib/handleApi";
import { CloudinaryResource, getCloudImage } from "@/lib/uploadImage";
import { UserSchema } from "@/validations/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ImageUpload from "../upload/ImageUpload";

type UserValues = {
  name: string;
  email: string;
  photo?: string;
};

const UpdateUserForm = ({ userId }: { userId: string }) => {
  const { user } = useContext(AuthContext);

  const [resource, setResource] = useState<CloudinaryResource>();

  useEffect(() => {
    (async () => {
      const resource = await getCloudImage(`${userId}`);
      setResource(resource);
    })();
  }, [userId]);

  const setImage = (res: CloudinaryResource) => {
    setResource(res);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      photo: user?.photo,
    },
  });

  const onSubmit: SubmitHandler<UserValues> = async (data) => {
    const { name, email } = data;

    const photo = resource?.secure_url || user?.photo;

    const body = { name, email, photo };

    await handleApi(`/users/update-me`, "PATCH", body).then((data) => {
      if (data?.status === "success") {
        toast.success("User updated");
      } else {
        toast.error("Error updating user: " + data?.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[50rem] flex-col rounded-lg bg-white p-8 shadow-lg"
    >
      <Input
        innerRef={register("name")}
        name="name"
        type="text"
        placeholder="Name"
        errors={errors.name}
      />
      <Input
        innerRef={register("email")}
        name="email"
        type="email"
        placeholder="Email"
        errors={errors.email}
      />
      <p className="my-8">
        Upload a new photo <span className="">(optional)</span>
      </p>

      <div className="mb-8 flex items-center justify-center gap-8">
        {resource && resource.public_id ? (
          <Image
            src={resource.secure_url}
            alt={resource.context?.alt || "Profile photo"}
            width={220}
            height={220}
            className="aspect-square rounded-full object-cover"
          />
        ) : (
          <div className="flex aspect-square h-[13.75rem] w-[13.75rem] items-center justify-center rounded-full bg-gray-200">
            <p>No image</p>
          </div>
        )}

        <ImageUpload userId={userId} setImage={setImage} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default UpdateUserForm;
