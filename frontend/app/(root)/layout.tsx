import { Footer } from "@/containers/Footer";
import Header from "@/containers/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="box">
      <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
