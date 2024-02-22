"use client";

import { Container } from "@/components/Container";
import Loading from "@/components/Loading";
import TourForm from "@/components/form/TourForm";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

const Page = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!loading && !isAuthenticated(["admin"])) {
      redirect("/unauthorized");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <Loading />;

  return (
    <Container className="!pt-20">
      <TourForm type="create" />
    </Container>
  );
};

export default Page;
