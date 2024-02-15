import ToursTable from "@/components/tours/ToursTable";
import { filtersToStringServer } from "@/lib/utils";
import { SearchParamsProps } from "@/types";

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
      return [];
    });

  return res?.data || [];
};

export default async function TourListPage({
  searchParams,
}: SearchParamsProps) {
  const tours = await getTours(searchParams);

  return (
    <div className="p-8 pt-20">
      <ToursTable tours={tours} />
    </div>
  );
}
