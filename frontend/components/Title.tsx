type TitleProps<T extends React.ElementType> = {
  as?: T;
  small?: boolean;
  large?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Title<T extends React.ElementType = "h2">({
  as,
  small,
  large,
  className = "",
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, keyof TitleProps<T>> &
  TitleProps<T>) {
  let Component = as ?? "h2";

  const baseStyles = "font-poly font-extrabold tracking-tight";
  const normalStyles = "text-3xl sm:text-4xl";
  const smallStyles = "text-lg sm:text-xl";
  const largeStyles = "text-5xl sm:text-6xl";

  const styles = large ? largeStyles : small ? smallStyles : normalStyles;

  return (
    <Component className={`${baseStyles} ${styles} ${className}`}>
      {children}
    </Component>
  );
}
