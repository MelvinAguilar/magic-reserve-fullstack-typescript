"use client";

import { Container } from "@/components/Container";
import TourForm from "@/components/form/TourForm";
import { AuthContext } from "@/context/AuthContext";
import { getRecords } from "@/lib/handleApi";
import { ParamsProps, Tour } from "@/types";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

const Page = ({ params }: ParamsProps) => {
  const [data, setData] = useState<Tour>();
  const { isAuthenticated, loading } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!loading && !isAuthenticated(["admin"])) {
      redirect("/unauthorized");
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    const fetchData = async () => {
      const tour: Tour = await getRecords("/tours/" + params.id);
      setData(tour);
    };

    fetchData();
  }, [params]);

  if (!data) {
    return <p>Loading...</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="!pt-20">
      <TourForm type="edit" tour={data} />
    </Container>
  );
};

export default Page;
