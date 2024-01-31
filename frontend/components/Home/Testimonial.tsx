import Image from "next/image";
import { StarFilledIcon } from "../SocialIcons";
import { Container } from "../Container";

interface TestimonialProps {
  src: string;
  alt: string;
  name: string;
  title: string;
  rating: number;
  review: string;
}

export default function Testimonial({
  src,
  alt,
  name,
  title,
  rating,
  review,
}: TestimonialProps) {
  return (
    <figure className="flex flex-col">
      <blockquote className="flex-1">
        <p className="sr-only">{rating} out of 5 stars</p>
        <div className="flex gap-1 text-indigo-300">
          <StarFilledIcon className="size-5" aria-hidden="true" />
          <StarFilledIcon className="size-5" aria-hidden="true" />
          <StarFilledIcon className="size-5" aria-hidden="true" />
          <StarFilledIcon className="size-5" aria-hidden="true" />
          <StarFilledIcon className="size-5" aria-hidden="true" />
        </div>
        <p className="mt-4">
          &quot;
          {review}
          &quot;
        </p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-x-4">
        <Image
          className="size-12 rounded-full bg-gray-50"
          src={src}
          alt={alt}
          width={48}
          height={48}
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm">{title}</p>
        </div>
      </figcaption>
    </figure>
  );
}

const testimonials = [
  {
    src: "https://i.imgur.com/gVXoto8.jpg",
    alt: "Testimonial 1",
    name: "Sarah Thompson",
    title: "Marketing Executive",
    rating: 5,
    review:
      "I recently embarked on a tour with this incredible travel agency, and the experience surpassed all my expectations. From the moment I booked, the team demonstrated unparalleled professionalism and attention to detail. The itinerary was a perfect balance of iconic landmarks and local treasures, all seamlessly woven together.",
  },
  {
    src: "https://i.imgur.com/gVXoto8.jpgg",
    alt: "Testimonial 2",
    name: "Yessica Christy",
    title: "Art Director",
    rating: 5,
    review:
      "This past summer, I had the pleasure of traveling with this agency. The team was incredibly knowledgeable and attentive, ensuring every moment of my journey was optimized for exploration. I can’t wait to book my next adventure!",
  },
];

export function TestimonialContainer() {
  return (
    <Container
      as="section"
      className="grid grid-cols-1 gap-8 !py-16 lg:grid-cols-2"
    >
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} {...testimonial} />
      ))}
    </Container>
  );
}
