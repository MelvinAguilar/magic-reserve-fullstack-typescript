import { Container } from "@/components/Container";
import ToursShowcase from "@/components/home/ToursShowcase";
import Filters from "@/components/tours/Filters";
import { filtersToStringServer } from "@/lib/utils";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

const getTours = async (searchParams: {
  [key: string]: string | undefined;
}) => {
  if (searchParams.duration) {
    const value = searchParams.duration;
    delete searchParams.duration;

    if (value === "1") {
      searchParams["duration[lte]"] = "7";
    } else if (value === "2") {
      searchParams["duration[gte]"] = "7";
      searchParams["duration[lte]"] = "14";
    } else if (value === "3") {
      searchParams["duration[gte]"] = "14";
      searchParams["duration[lte]"] = "21";
    } else {
      searchParams["duration[gte]"] = "21";
    }
  }

  const url =
    process.env.NEXT_PUBLIC_API_URL +
    "/tours?" +
    (searchParams ? filtersToStringServer(searchParams) : "");

  const res = await fetch(url, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return [];
    });

  return res?.data || [];
};

export default async function ToursPage({ searchParams }: SearchParamsProps) {
  const tours = await getTours(searchParams);

  return (
    <main className="flex-1">
      <div className="relative bg-primary/20 pt-20">
        <Container as="section">
          <Filters searchParams={searchParams} />
        </Container>
      </div>

      <Container as="section" className="grid !py-16">
        <ToursShowcase tours={tours} hideButton />
      </Container>
    </main>
  );
}
