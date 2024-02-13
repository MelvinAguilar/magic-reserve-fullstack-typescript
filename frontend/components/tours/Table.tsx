"use client";

import React from "react";

export const Link = React.forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return <a {...props} ref={ref} />;
});

export function Table({
  className = "",
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <table {...props} className={`${className} w-full text-left text-sm`}>
      {children}
    </table>
  );
}

export function TableHead({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"thead">) {
  return <thead className={`${className} text-zinc-500`} {...props} />;
}

export function TableBody(props: React.ComponentPropsWithoutRef<"tbody">) {
  return <tbody {...props} />;
}

export function TableRow({
  className = "",
  children,
  ...props
}: React.ComponentPropsWithoutRef<"tr">) {
  return (
    <tr {...props} className={`${className}`}>
      {children}
    </tr>
  );
}

export function TableHeader({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"th">) {
  return (
    <th
      {...props}
      className={`${className} border border-primary  px-4 py-2 font-medium`}
    />
  );
}

export function TableCell({
  className = "",
  children,
  ...props
}: React.ComponentPropsWithoutRef<"td">) {
  return (
    <td
      {...props}
      className={`${className} relative border border-primary px-4 py-4`}
    >
      {children}
    </td>
  );
}
