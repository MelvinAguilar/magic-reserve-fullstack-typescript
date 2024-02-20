"use client";

import { Container } from "@/components/Container";
import TourForm from "@/components/form/TourForm";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect } from "react";

const Page = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!loading && !isAuthenticated(["admin"])) {
      redirect("/unauthorized");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="!pt-20">
      <TourForm type="create" />
    </Container>
  );
};

export default Page;
