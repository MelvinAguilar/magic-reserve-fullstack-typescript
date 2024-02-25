"use client";

import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Tour = {
  images: string[];
  name: string;
};

const Galery = ({ tour }: { tour: Tour }) => {
  return (
    <div className="grid grid-cols-3 gap-8 mt-8">
      <div>
        <Zoom>
          <Image
            src={tour.images[0]}
            alt={tour.name}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </Zoom>
      </div>
      <div>
        <Zoom>
          <Image
            src={tour.images[1]}
            alt={tour.name}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </Zoom>
      </div>
      <div>
        <Zoom>
          <Image
            src={tour.images[2]}
            alt={tour.name}
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </Zoom>
      </div>
    </div>
  );
};

export default Galery;
