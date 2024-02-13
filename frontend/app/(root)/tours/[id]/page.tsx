import { Container } from "@/components/Container";
import { Tour, URLProps } from "@/types";
import { toast } from "sonner";
import Image from "next/image";
import RatingStars from "@/components/reviews/RatingStars";
import Reviews from "@/components/reviews/Reviews";
import MapComponent from "@/components/Map";

const getTour = async (id: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/tours/" + id;

  const res = await fetch(url, { cache: "no-store" })
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((err) => {
      toast.error("Error fetching tour");
      console.error(err);
    });

  return res?.data || [];
};

const getReviews = async (id: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/tours/" + id + "/reviews";

  const res = await fetch(url, { method: "GET", cache: "no-store" })
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      toast.error("Error fetching reviews");
    });
  return res?.data || [];
};

const Page = async ({ params }: URLProps) => {
  const { id } = params;
  const tour: Tour = await getTour(id);

  if (!tour) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container
        as="main"
        className="mt-10 flex flex-col items-center justify-center"
      >
        <div className="relative flex min-h-screen w-full items-center justify-center">
          <Image
            src={tour.imageCover}
            alt={tour.name}
            width={600}
            height={400}
            className="absolute -z-10 size-full rounded-lg object-cover"
          />

          <h1 className="text-center text-4xl font-bold text-white">
            {tour.name}
          </h1>
        </div>
      </Container>
      <Container as="section" className="!pt-2">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-1">
            <RatingStars
              rating={tour.ratingsAverage}
              quantity={tour.ratingsQuantity}
            />
            <h2 className="mb-4 mt-8 font-poly text-3xl font-extrabold tracking-tight">
              Quick facts about the tour
            </h2>
            <p>{tour.summary}</p>
            <p>
              <span className="font-bold">{tour.duration}</span> days
            </p>
            <p className="">
              <span className="font-bold">{tour.maxGroupSize}</span> people
            </p>
            <p className="">
              <span className="font-bold">
                {tour.startLocation.description}
              </span>
            </p>
          </div>
          <div>
            <p className="text-center text-8xl font-bold">${tour.price}</p>
            {/* <AddCartButton {...tour} /> */}
          </div>
          <div>
            <Image
              src={tour.images[0]}
              alt={tour.name}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <Image
              src={tour.images[1]}
              alt={tour.name}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <Image
              src={tour.images[2]}
              alt={tour.name}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </Container>
      <Container as="section">
        <h2 className="mb-4 mt-8 font-poly text-3xl font-extrabold tracking-tight">
          Your adventure
        </h2>

        <p>{tour.description}</p>

        <h2 className="mb-4 mt-8 font-poly text-3xl font-extrabold tracking-tight">
          Destinations and schedule &mdash; {tour.locations.length}
        </h2>
        <ul className="mt-8 flex list-disc flex-col ">
          {tour.locations.map((location: any) => (
            <li key={location._id} className="flex gap-3">
              <h3 className="font-bold">{location.description}</h3> |{" "}
              <p>{location.day} day</p>
            </li>
          ))}
        </ul>

        <h2 className="mb-4 mt-8 font-poly text-3xl font-extrabold tracking-tight">
          Tour guides &mdash; {tour.guides.length}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {tour.guides.map((guide: any) => (
            <div key={guide._id} className="flex flex-col gap-1">
              <div className="mb-2 flex flex-wrap items-center gap-5">
                {guide.photo ? (
                  <Image
                    src={guide.photo}
                    alt={guide.name}
                    width={44}
                    height={44}
                    className="aspect-square rounded-full object-cover"
                  />
                ) : (
                  <p className="grid size-11 place-content-center rounded-full bg-gray-300">
                    {guide.name[0]}
                  </p>
                )}

                <h3 className="font-bold">{guide.name}</h3>
                <p className="opacity-70">
                  {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"}
                </p>
              </div>
              <div className="ml-16">
                <p>{guide.email}</p>
                <p>{guide.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Container as="section">
        <MapComponent locations={tour.locations} /> 
      </Container>
      <div className="bg-[#F3F3F3]">
        <Container as="section">
          <Reviews reviews={tour.reviews} id={id} />
        </Container>
      </div>
    </>
  );
};

export default Page;
