import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center relative bg-primary/50">
      {children}
      <Image
        src="https://i.imgur.com/2JjU5I8.jpeg"
        alt=""
        width={1000}
        height={1000}
        className="absolute inset-0 -z-10 w-full h-full"
      />
    </main>
  );
};

export default Layout;