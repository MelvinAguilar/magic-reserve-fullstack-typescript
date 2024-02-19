export function StarFilledIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M10 3.333l1.96 4.253 4.39.64-3.18 3.11.75 4.37-3.92-2.06-3.92 2.06.75-4.37-3.18-3.11 4.39-.64L10 3.333z"
      />
    </svg>
  );
}

export function StarIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M10 3.333l1.96 4.253 4.39.64-3.18 3.11.75 4.37-3.92-2.06-3.92 2.06.75-4.37-3.18-3.11 4.39-.64L10 3.333z"
      />
    </svg>
  );
}

export function StarHalfIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M10 3.333l1.96 4.253 4.39.64-3.18 3.11.75 4.37-3.92-2.06-3.92 2.06.75-4.37-3.18-3.11 4.39-.64L10 3.333z"
      />
    </svg>
  );
}

export function StarOutlineIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M10 3.333l1.96 4.253 4.39.64-3.18 3.11.75 4.37-3.92-2.06-3.92 2.06.75-4.37-3.18-3.11 4.39-.64L10 3.333z"
      />
    </svg>
  );
}

export function MapMarkerIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M10 3.333l1.96 4.253 4.39.64-3.18 3.11.75 4.37-3.92-2.06-3.92 2.06.75-4.37-3.18-3.11 4.39-.64L10 3.333z"
      />
    </svg>
  );
}

export function PinIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    // <svg

    //   viewBox="0 0 20 20"
    //   xmlns="http://www.w3.org/2000/svg"
    //   fill="currentColor"
    // >
    //   <path
    //     clipRule="evenodd"
    //     fillRule="evenodd"
    //     d="M10 3.333l1.96 4.253 4.39.64-3.18 3.11.75 4.37-3.92-2.06-3.92 2.06.75-4.37-3.18-3.11 4.39-.64L10 3.333z"
    //   />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      {...props}
      fill="currentColor"
    >
      <path d="M4 12a12 12 0 0 1 24 0c0 8-12 20-12 20S4 20 4 12m7 0a5 5 0 0 0 10 0 5 5 0 0 0-10 0Z"></path>
    </svg>
  );
}

export function SmallPinIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      ></path>
    </svg>
  );
}

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <g id="search">
      <path
        id="Shape"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const ShoppingBagIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        strokeLinejoin="round"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

export const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18M4.5 6l1.5 14h12l1.5-14"
      ></path>
    </svg>
  );
};

export const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 16"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
      />
    </svg>
  );
};

export const IconPlus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      aria-hidden="true"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 1v16M1 9h16"
      />
    </svg>
  );
};

export const IconMinus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      aria-hidden="true"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 9h16"
      />
    </svg>
  );
};

export function IconHome(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
  );
}

export function IconTour(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 576 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h512c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4 6.5-78.5-23.9-155.5-80.8-208.5 2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4-.9-.4-1.9-.7-2.8-1.1-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zm-354.8 13.8c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2-79.6 2.5-154.7 42.2-201.2 108z" />
    </svg>
  );
}

export function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
    </svg>
  );
}
export function IconReservation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M0 4.5A1.5 1.5 0 011.5 3h13A1.5 1.5 0 0116 4.5V6a.5.5 0 01-.5.5 1.5 1.5 0 000 3 .5.5 0 01.5.5v1.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 11.5V10a.5.5 0 01.5-.5 1.5 1.5 0 100-3A.5.5 0 010 6V4.5zM1.5 4a.5.5 0 00-.5.5v1.05a2.5 2.5 0 010 4.9v1.05a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-1.05a2.5 2.5 0 010-4.9V4.5a.5.5 0 00-.5-.5h-13z" />
    </svg>
  );
}

