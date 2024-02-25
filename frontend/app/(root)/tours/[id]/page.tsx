import { Container } from "@/components/Container";
import Galery from "@/components/Galery";
import MapComponent from "@/components/Map";
import NoResult from "@/components/NoResult";
import { Title } from "@/components/Title";
import { GenericCard } from "@/components/cards/GenericCard";
import AddCartButton from "@/components/cart/AddCartButton";
import RatingStars from "@/components/reviews/RatingStars";
import Reviews from "@/components/reviews/Reviews";
import { getRecord } from "@/lib/handleApi";
import { Tour, URLProps } from "@/types";
import Image from "next/image";

const Page = async ({ params }: URLProps) => {
  const { id } = params;
  const tour: Tour = await getRecord("/tours/" + id);

  if (!tour)
    return (
      <NoResult
        title="Tour not found"
        description="We couldn't find the tour you are looking for"
        link="/tours"
        linkTitle="Back to tours &rarr;"
      />
    );

  return (
    <>
      <Container
        as="main"
        className="mt-10 flex flex-col items-center justify-center"
      >
        <div className="relative flex min-h-screen w-full items-center rounded-lg justify-center bg-primary/20">
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
        <Galery tour = {tour}/>
      </Container>
      <Container as="section" className="!pt-2">
        <RatingStars
          rating={tour.ratingsAverage}
          quantity={tour.ratingsQuantity}
        />
        <div className="grid items-start gap-8 pb-8 md:grid-cols-[2fr,1fr]">
          <div className="mt-8 flex flex-col justify-center gap-1">
            <Title className="mb-4 ">Quick facts about the tour</Title>
            <p>{tour.summary}</p>
            <ul className="mt-8 flex flex-wrap gap-4">
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
            <p>
              {tour.currentGroupSize} people are currently booked on this tour
            </p>
            <div className="my-3 border-y border-gray-400 py-4">
              <p>
                {tour.maxGroupSize - tour.currentGroupSize} spots left for this
                tour
              </p>
            </div>
            {tour.priceDiscount ? (
              <>
                <Title
                  as="del"
                  className="mb-2 text-gray-500 line-through"
                  small
                >
                  ${tour.price}
                </Title>
                <Title large>${tour.price - tour.priceDiscount}</Title>
              </>
            ) : (
              <Title large>${tour.price}</Title>
            )}

            {tour.currentGroupSize === tour.maxGroupSize ? (
              <p className="text-rose-500">Tour is fully booked</p>
            ) : (
              <AddCartButton {...tour} />
            )}
          </GenericCard>
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
            <div key={guide._id} className="flex items-center gap-5">
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
