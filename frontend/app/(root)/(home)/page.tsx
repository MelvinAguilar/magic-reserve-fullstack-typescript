import { Container } from "@/components/Container";
import Image from "next/image";

export default function Home() {
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
          className="column-2 w-[45vw] opacity-85 object-cover object-center h-[92vh]"
        />
      </Container>

      <Container as="section" className="!py-16 grid">
        <div className="gap-16 items-center lg:grid lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Image
              className="w-full rounded-lg"
              src="https://i.imgur.com/I2m3yBh.jpg"
              alt=""
              width={500}
              height={500}
            />
            <Image
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://i.imgur.com/X6NhvOq.jpg"
              alt=""
              width={500}
              height={500}
            />
          </div>
          <div>
            <h2 className="mb-4 tracking-tight text-3xl font-poly font-extrabold">
              Elevate Your Journey with Us
            </h2>
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

      <div className=" relative min-h-screen grid place-content-center">
        <h2 className="font-poly leading-none z-10 title">Tours</h2>
        <Image
          src="https://i.imgur.com/KbWVnGv.jpg"
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center -z-10"
        />
      </div>
    </main>
  );
}
