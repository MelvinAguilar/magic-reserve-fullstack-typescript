import { Container } from "@/components/Container";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Container className="grid">
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
          className="column-2 w-[45vw] opacity-85"
        />
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
