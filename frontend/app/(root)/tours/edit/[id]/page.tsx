"use client";

import { Container } from "@/components/Container";
import TourForm from "@/components/form/TourForm";
import { ParamsProps, Tour } from "@/types";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

const getTour = async (id: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/tours/" + id;
  const res = await fetch(url, { cache: "no-store" })
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((err) => {
      toast.error("Error fetching tour");
    });

  return res?.data || [];
};

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
      const tour: Tour = await getTour(params.id);
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
