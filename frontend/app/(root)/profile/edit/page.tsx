"use client";

import { Container } from "@/components/Container";
import UpdatePasswordForm from "@/components/form/UpdatePasswordForm";
import UpdateUserForm from "@/components/form/UpdateUserForm";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const Page = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
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
    <Container
      as="main"
      className="mt-10 flex flex-col items-center justify-center"
    >
      <div className="flex justify-center">
        <section className="flex flex-col items-center">
          <h2 className="mb-8 text-4xl font-bold">Edit Profile</h2>
          <UpdateUserForm userId={user._id} />
        </section>
      </div>

      <div className="mt-12 flex justify-center">
        <section className="flex flex-col items-center">
          <h2 className="mb-8 text-4xl font-bold">Change Password</h2>
          <UpdatePasswordForm />
        </section>
      </div>
    </Container>
  );
};

export default Page;
