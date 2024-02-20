import React from "react";
import { Container } from "../Container";
import SideBar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="grid flex-1 grid-cols-[auto,1fr]">
      <SideBar />

      <Container className="mt-20 pt-0 p-8">{children}</Container>
    </div>
  );
};

export default DashboardLayout;
