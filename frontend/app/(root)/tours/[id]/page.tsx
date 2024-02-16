import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { GenericCard } from "@/components/cards/GenericCard";
import AddCartButton from "@/components/cart/AddCartButton";
import RatingStars from "@/components/reviews/RatingStars";
import Reviews from "@/components/reviews/Reviews";
import { Tour, URLProps } from "@/types";
import Image from "next/image";
import { toast } from "sonner";

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
        <div className="relative flex min-h-screen w-full items-center justify-center bg-primary/20">
          <Image
            src={tour.imageCover}
            alt={tour.name}
            width={600}
            height={400}
            className="absolute -z-10 size-full rounded-lg object-cover"
          />

          <Title as="h1" className="text-center text-white" large>
            {tour.name}
          </Title>
        </div>
      </Container>
      <Container as="section" className="!pt-2">
        <RatingStars
          rating={tour.ratingsAverage}
          quantity={tour.ratingsQuantity}
        />
        <div className="grid gap-8 md:grid-cols-[2fr,1fr] items-start pb-8">
          <div className="mt-8 flex flex-col justify-center gap-1">
            <Title className="mb-4 ">Quick facts about the tour</Title>
            <p>{tour.summary}</p>
            <ul className="flex flex-wrap gap-4 mt-8">
              <GenericCard as="ul">
                <p>
                  <span className="font-bold">{tour.duration}</span> days
                </p>
              </GenericCard>
              <GenericCard as="ul">
                <p className="">
                  <span className="font-bold">{tour.maxGroupSize}</span> people
                </p>
              </GenericCard>
              <GenericCard as="ul">
                <p className="">
                  <span className="font-bold">
                    {tour.startLocation.description}
                  </span>
                </p>
              </GenericCard>
            </ul>
          </div>
          <GenericCard className="!w-full">
            {tour.priceDiscount ? (
              <>
                <Title as="del" className="line-through text-gray-500 mb-2">${tour.price}</Title>
                <Title large>${tour.price - tour.priceDiscount}</Title>
              </>
            ) : (
              <Title large>${tour.price}</Title>
            )}

            <AddCartButton {...tour} />
          </GenericCard>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
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
        <Title className="mb-8 mt-8">Your adventure</Title>

        <p>{tour.description}</p>

        <Title className="mb-8 mt-20">
          Destinations and schedule &mdash; {tour.locations.length}
        </Title>
        <ul className="flex list-disc flex-col ">
          {tour.locations.map((location: any) => (
            <li key={location._id} className="flex gap-3">
              <h3 className="font-bold">{location.description}</h3> |{" "}
              <p>{location.day} day</p>
            </li>
          ))}
        </ul>

        <Title className="mb-8 mt-20">
          Tour guides &mdash; {tour.guides.length}
        </Title>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {tour.guides.map((guide: any) => (
            <div key={guide._id} className="flex gap-5 items-center">
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
                <div>

              <div className="flex items-center gap-5">
                <h3 className="font-bold">{guide.name}</h3>
                <p className="opacity-70">
                  {guide.role === "lead-guide" ? "Lead guide" : "Tour guide"}
                </p>
              </div>
              <div>
                <p>{guide.email}</p>
                <p>{guide.phone}</p>
              </div>
                </div>
            </div>
          ))}
        </div>
      </Container>
      {/* <Container as="section">
        <MapComponent locations={tour.locations} /> 
      </Container> */}
      <div className="bg-[#F3F3F3]">
        <Container as="section">
          <Reviews reviews={tour.reviews} id={id} />
        </Container>
      </div>
    </>
  );
};

export default Page;
