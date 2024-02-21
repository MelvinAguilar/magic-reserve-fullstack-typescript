import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { TestimonialContainer } from "@/components/home/Testimonial";
import ToursShowcase from "@/components/home/ToursShowcase";
import { getRecords } from "@/lib/handleApi";
import Image from "next/image";

export default async function Home() {
  const tours = await getRecords("/tours?limit=6");

  return (
    <main id="main">
      <Container as="section" className="grid">
        <div className="column-1 grid min-h-screen items-center">
          <h1 className="font-title font-poly leading-none">
            Create your own adventure, live your story.
          </h1>
        </div>
        <Image
          src="https://i.imgur.com/PjDPvgi.jpg"
          alt=""
          width={1920}
          height={1080}
          className="column-2 h-[92vh] w-[45vw] object-cover object-center opacity-85"
        />
      </Container>

      <Container as="section" className="grid !py-16">
        <div className="items-center gap-16 lg:grid lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Image
              className="w-full rounded-lg"
              src="https://i.imgur.com/I2m3yBh.jpg"
              alt=""
              width={500}
              height={500}
            />
            <Image
              className="mt-4 w-full rounded-lg lg:mt-10"
              src="https://i.imgur.com/X6NhvOq.jpg"
              alt=""
              width={500}
              height={500}
            />
          </div>
          <div>
            <Title className="mb-4">Elevate Your Journey with Us</Title>
            <p className="mb-4">
              Unleash the full potential of your adventure with our meticulously
              planned itineraries. Each journey is thoughtfully curated to
              strike the perfect balance between must-see landmarks and hidden
              gems.
            </p>
            <p>
              Our travel experts ensure every moment is optimized for
              exploration, ensuring a seamless and enriching experience for
              every traveler.
            </p>
          </div>
        </div>
      </Container>

      <Container as="section" className="grid !py-16">
        <ToursShowcase tours={tours} />
      </Container>

      <div className=" relative grid min-h-screen place-content-center">
        <h2 className="title z-10 font-poly leading-none">Tours</h2>
        <Image
          src="https://i.imgur.com/KbWVnGv.jpg"
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 size-full object-cover object-center"
        />
      </div>

      <TestimonialContainer />
    </main>
  );
}
