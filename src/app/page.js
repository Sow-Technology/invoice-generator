import Dashboard from "@/components/pages/Dashboard";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default page;
