import { Container } from "@/components/Container";
import ToursShowcase from "@/components/home/ToursShowcase";
import Filters from "@/components/tours/Filters";
import { getRecords } from "@/lib/handleApi";
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

  const tourList = await getRecords(
    "/tours?" + (searchParams ? filtersToStringServer(searchParams) : ""),
  );
  return tourList;
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
