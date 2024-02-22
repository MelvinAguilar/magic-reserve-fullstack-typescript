import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Title } from "./Title";
import { LinkComponent } from "./Button";

interface Props {
  title: string;
  description: string;
  link?: string;
  linkTitle?: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex min-h-screen w-full flex-col items-center justify-center">
      <Image
        src="https://i.imgur.com/y4jWnAd.png"
        alt="No Result Illustration"
        width={270}
        height={200}
        className="object-contain"
      />
      <Title className="mt-2">{title}</Title>
      <p className="text-center">
        {description}
      </p>
      {link && linkTitle && (
      <LinkComponent href={link} className="mt-8 !w-fit">
          {linkTitle}
      </LinkComponent>
      )}
    </div>
  );
};

export default NoResult;