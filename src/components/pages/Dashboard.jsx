"use client";

import Sidebar from "./dashboard/Sidebar";
import { useState } from "react";
import DataCard from "./dashboard/DataCard";
import Invoices from "./dashboard/Invoices";
import DashboardSection from "./dashboard/DashboardSection";
import Coupons from "./dashboard/Coupons";
import Stores from "./dashboard/store";
import { useQuery } from "@tanstack/react-query";
import InventoryPage from "./inventory/page";
import axios from "axios";
import { startOfQuarter } from "date-fns";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [dateRange, setDateRange] = useState({
    from: startOfQuarter(new Date()),
    to: new Date(),
  });
  // Handle the invoice query
  const {
    data: invoiceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoices", dateRange.from, dateRange.to],
    queryFn: () =>
      fetch(`/api/getInvoices?from=${dateRange.from}&to=${dateRange.to}`, {
        method: "GET",
      }).then((res) => res.json()),
  });

  const data = {}; // make sure to define or fetch this properly

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices: {error.message}</div>;
  console.log(dateRange);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar active={active} setActive={setActive} />
      {active === "Dashboard" && (
        <DashboardSection
          data={data}
          invoiceData={invoiceData}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      )}
      {active === "Invoices" && <Invoices data={invoiceData} />}
      {active === "Coupons" && <Coupons />}
      {active === "Products" && <InventoryPage />}
      {active === "Stores" && <Stores />}
    </div>
  );
}
