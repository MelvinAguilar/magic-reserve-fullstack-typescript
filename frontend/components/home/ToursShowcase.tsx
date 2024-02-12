"use client";
import React, { useEffect, useState } from "react";
import Card from "../cards/Card";

interface Tour {
  id: string;
  name: string;
  imageCover: string;
}

const ToursShowcase = ({
  tours,
}: Readonly<{
  tours: Tour[];
}>) => {
  return (
    <section>
      <h2 className="font-poly mb-4 text-3xl font-extrabold tracking-tight">
        Popular Tours
      </h2>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!tours || tours.length === 0 ? (
          <p>No tours available</p>
        ) : (
          tours.map((tour) => (
            <li key={tour.id}>
              <Card
                id={tour.id}
                name={tour.name}
                imageCover={tour.imageCover}
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default ToursShowcase;
