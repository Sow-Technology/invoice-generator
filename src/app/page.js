import Dashboard from "@/components/pages/Dashboard";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default page;
