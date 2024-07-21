import Dashboard from "@/components/pages/Dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    // <div className="flex h-screen w-full items-center justify-center">
    //   <Link href="/invoice">
    //     <Button>Create new invoice</Button>
    //   </Link>
    // </div>
    <Dashboard />
  );
};

export default page;
