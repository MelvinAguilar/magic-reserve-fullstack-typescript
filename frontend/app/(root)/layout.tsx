import Header from "@/containers/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="box">{children}</div>
    </>
  );
};

export default Layout;
