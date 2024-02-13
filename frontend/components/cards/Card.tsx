"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CardProps {
  id: string;
  name: string;
  imageCover: string;
  summary: string;
}

const Card = ({ id, name, summary, imageCover }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={`relative flex aspect-[16/12] flex-col-reverse overflow-hidden rounded-lg p-6 text-white shadow-sm transition-all ${
          isHovered ? "card-hovered" : ""
        }`}
      >
        <Image
          src={imageCover}
          alt={name}
          width={500}
          height={500}
          className={`absolute inset-0 -z-10 size-full object-cover object-center transition-all ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <Link
          href={`/tours/${id}`}
          className="card-link absolute inset-0 z-10 bg-transparent transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="sr-only">View details for {name}</span>
        </Link>
        <div className="card-details">
          <div className="absolute  top-0 transform"></div>

          <p
            aria-hidden="true"
            className="card-item blend-exclusion font-poly !text-[6vw] font-black leading-none"
          >
            {name}
          </p>
          <h3 className="card-title z-[1] font-poly text-lg font-extrabold leading-tight tracking-tight ">
            {summary}
          </h3>
        </div>
      </div>
      <h3 className="mt-4 font-poly text-xl font-extrabold leading-tight tracking-tight">
        {name}
      </h3>
    </>
  );
};

export default Card;
