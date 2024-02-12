import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  id: string;
  name: string;
  imageCover: string;
}

const Card = ({ id, name, imageCover }: CardProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg p-8">
      <Image src={imageCover} alt={name} width={500} height={500} />
      <h3>{name}</h3>
      <Link href={`/tours/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {name}</span>
      </Link>
    </div>
  );
};

export default Card;
