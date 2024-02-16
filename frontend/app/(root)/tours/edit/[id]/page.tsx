import { Container } from "@/components/Container";
import TourForm from "@/components/form/TourForm";
import { ParamsProps, Tour } from "@/types";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

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

const Page = async ({ params }: ParamsProps) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const tour: Tour = await getTour(params.id);

  useLayoutEffect(() => {
    if (!loading && !isAuthenticated(["admin"])) {
      redirect("/unauthorized");
    }
  }, [isAuthenticated, loading]);

  if (!tour) {
    return <p>Loading...</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <TourForm type="edit" tour={tour} />
    </Container>
  );
};

export default Page;
