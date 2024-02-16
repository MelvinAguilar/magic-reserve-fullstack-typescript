type PageProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
};

export function GenericCard<T extends React.ElementType = "div">({
  as,
  className = "",
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof PageProps<T>> & PageProps<T>) {
  let Component = as ?? "div";

  return (
    <Component className={`w-fit rounded-lg border border-gray-300 p-6 shadow-sm transition-all ${className}`}>
      {children}
    </Component>
  );
}
