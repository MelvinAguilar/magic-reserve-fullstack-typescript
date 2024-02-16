"use client";

import { LinkComponent } from "@/components/Button";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Page = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center ">
        <p className="mb-6 text-2xl font-bold">No user found</p>
        <p className="text-lg font-bold">
          You need to login to see your profile
        </p>
        <Link
          href="/sign-in"
          className="font-poly text-lg font-bold tracking-tight underline"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[1fr,2.5fr]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-4 p-8">
          {user.photo ? (
            <Image
              src={user?.photo}
              alt="Profile picture"
              className="h-32 w-32 rounded-full"
              width={128}
              height={128}
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-300">
              <p className="text-center">No photo</p>
            </div>
          )}
          <p className="font-poly text-lg font-bold tracking-tight">
            {user.email}
          </p>
          <p className="flex items-center gap-3 rounded-lg bg-primary/20 px-2.5 py-1 text-base leading-[unset] text-primary ring-1 ring-inset ring-primary/80">
            {user.role}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 bg-white p-8">
          <h1 className="mt-12 text-center text-[8vw] font-bold leading-[1]">
            {user.name}
          </h1>
          <div className="grid md:grid-cols-2 w-full space-x-4">
            <LinkComponent
              href="/profile/edit"
              className="!rounded-lg"
            >
              Edit profile
            </LinkComponent>
            <LinkComponent
              href="/profile/change-password"
              className="rounded-lg"
            >
              Change password
            </LinkComponent>
          </div>
        </div>
      </div>
  );
};

export default Page;
