import { LinkComponent } from "@/components/Button";
import { IconPlus } from "@/components/Icons";
import { Title } from "@/components/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ToursTable from "@/components/tours/ToursTable";
import { getRecords } from "@/lib/handleApi";
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

  const tourList = await getRecords(
    "/tours?" + (searchParams ? filtersToStringServer(searchParams) : ""),
  );
  return tourList;
};

export default async function TourListPage({
  searchParams,
}: SearchParamsProps) {
  const tours = await getTours(searchParams);

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center">
        <Title as="h1">Tours List</Title>
        <LinkComponent
          href="/tours/create"
          className="ml-auto flex !w-fit items-center"
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Create Tour
        </LinkComponent>
      </div>
      <ToursTable tours={tours} />
    </DashboardLayout>
  );
}
