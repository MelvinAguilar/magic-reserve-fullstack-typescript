import React from "react";
import { Title } from "./Title";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Title as="p">
        loading
        <span className="loading-dot">.</span>
        <span className="loading-dot">.</span>
        <span className="loading-dot">.</span>
      </Title>
    </div>
  );
};

export default Loading;
