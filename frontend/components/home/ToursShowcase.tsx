"use client";

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
      <h2 className="mb-12 font-poly text-3xl font-extrabold tracking-tight">
        Popular Tours
      </h2>

      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2">
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
        <div className="mt-8 text-center">
          <a
            href="/tours"
            className="font-poly text-lg font-bold tracking-tight underline"
          >
            View all tours
          </a>
        </div>
      )}
    </section>
  );
};

export default ToursShowcase;
