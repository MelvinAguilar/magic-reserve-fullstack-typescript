import { Container } from "@/components/Container";
import ToursShowcase from "@/components/home/ToursShowcase";
import PageSizeSelector from "@/components/pagination/PageSizeSelector";
import Pagination from "@/components/pagination/Pagination";
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
    "/tours?sort=name&" +
      (searchParams ? filtersToStringServer(searchParams) : ""),
    true,
  );
  return tourList;
};

export default async function ToursPage({ searchParams }: SearchParamsProps) {
  const { data, recordCount } = await getTours(searchParams);

  return (
    <main className="flex-1">
      <div className="relative bg-primary/20 pt-20">
        <Container as="section">
          <Filters searchParams={searchParams} />
        </Container>
      </div>

      <Container as="section" className="grid !py-16">
        <ToursShowcase tours={data} hideButton />
        <Pagination
          total={recordCount}
          limit={searchParams.limit ? parseInt(searchParams.limit) : 10}
          currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
        />
        <PageSizeSelector total={recordCount} />
      </Container>
    </main>
  );
}
