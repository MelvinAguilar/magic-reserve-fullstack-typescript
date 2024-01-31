type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
};

export function Container<T extends React.ElementType = "div">({
  as,
  className = "",
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>> &
  ContainerProps<T>) {
  let Component = as ?? "div";

  return (
    <Component
      className={`w-full mx-auto max-w-7xl px-4 md:p-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}