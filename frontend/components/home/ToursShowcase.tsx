"use client";

import Link from "next/link";
import { Title } from "../Title";
import Card from "../cards/Card";

interface Tour {
  id: string;
  name: string;
  imageCover: string;
  summary: string;
}

const ToursShowcase = ({
  tours,
  hideButton,
}: Readonly<{
  tours: Tour[];
  hideButton?: boolean;
}>) => {
  return (
    <section>
      <Title className="mb-12">Popular Tours</Title>

      <ul className="grid grid-cols-1 gap-14 gap-y-16 sm:grid-cols-2">
        {!tours || tours.length === 0 ? (
          <p>No tours available</p>
        ) : (
          tours.map((tour) => (
            <li key={tour.id}>
              <Card
                id={tour.id}
                name={tour.name}
                imageCover={tour.imageCover}
                summary={tour.summary}
              />
            </li>
          ))
        )}
      </ul>

      {!hideButton && (
        <div className="mt-12 text-center">
          <Link
            href="/tours"
            className="font-poly text-xl font-bold tracking-tight underline"
          >
            View all tours <span>&rarr;</span>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ToursShowcase;
