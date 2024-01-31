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
