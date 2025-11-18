import React from "react";
import Home from "./components/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soltech Nexus | Home",
  description: "Soltech nexus.",
};

const Page = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default Page;
