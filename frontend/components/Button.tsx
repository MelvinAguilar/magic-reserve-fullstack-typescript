import Link from "next/link";
import React from "react";

interface CommonProps {
  className?: string;
  children: React.ReactNode;
  secondary?: boolean;
}

const baseStyles =
  "rounded-lg px-24 py-3 font-poly text-white transition-all w-full block text-center";
const primaryStyles = "bg-primary hover:bg-primary-light";
const secondaryStyles = "bg-auxiliary hover:bg-auxiliary-light";

const getStyles = (secondary?: boolean) =>
  `${baseStyles} ${secondary ? secondaryStyles : primaryStyles}`;

const Button: React.FC<
  CommonProps & React.ComponentPropsWithoutRef<"button">
> = ({ className = "", children, secondary, ...props }) => {
  const buttonStyles = getStyles(secondary) + " " + className;

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

const LinkComponent: React.FC<
  CommonProps & React.ComponentPropsWithoutRef<"a">
> = ({ className = "", children, secondary, ...props }) => {
  const linkStyles = getStyles(secondary) + " " + className;

  return (
    <Link href={props.href || ""} className={linkStyles} {...props}>
      {children}
    </Link>
  );
};

export default Button;
export { LinkComponent };
