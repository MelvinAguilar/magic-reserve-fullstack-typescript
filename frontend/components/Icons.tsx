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