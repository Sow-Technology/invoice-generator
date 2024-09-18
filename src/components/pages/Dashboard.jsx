"use client";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { startOfQuarter, format } from "date-fns"; // Import `format` from date-fns to format dates
import Invoices from "./dashboard/Invoices";
// import Coupons from "./dashboard/Coupons";
import InventoryPage from "./inventory/page";
// import DashboardSection from "./dashboard/DashboardSection";
import Sidebar from "./dashboard/Sidebar";
import { useState } from "react";
import DataCard from "./dashboard/DataCard";
// import Invoices from "./dashboard/Invoices";
import DashboardSection from "./dashboard/DashboardSection";
import Coupons from "./dashboard/Coupons";
import Stores from "./dashboard/store";
// import { useQuery } from "@tanstack/react-query";
// import InventoryPage from "./inventory/page";
import axios from "axios";
// import { startOfQuarter } from "date-fns";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [dateRange, setDateRange] = useState({
    from: startOfQuarter(new Date()),
    to: new Date(),
  });

  // Format dates to "YYYY-MM-DD" to remove time and timezone
  const formattedFrom = format(dateRange.from, "yyyy-MM-dd");
  const formattedTo = format(dateRange.to, "yyyy-MM-dd");

  // Use axios for fetching invoices
  const {
    data: invoiceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoices", formattedFrom, formattedTo], // Update query key to formatted dates
    queryFn: async () => {
      const response = await axios.get("/api/getInvoices", {
        params: {
          from: formattedFrom, // Send date in "YYYY-MM-DD" format
          to: formattedTo, // Send date in "YYYY-MM-DD" format
        },
      });
      return response.data;
    },
  });
  const fetchMetrics = async (fromDate, toDate) => {
    const { data } = await axios.get("/api/metrics", {
      params: {
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
      },
    });
    return data;
  };
  const {
    data: metricsData,
    isLoading: metricsLoading,
    error: metricsError,
  } = useQuery({
    queryKey: ["metrics", formattedFrom, formattedTo],
    queryFn: () => fetchMetrics(dateRange.from, dateRange.to),
  });
  const data = {};
  console.log(metricsData);
  // Loading and Error Handling
  if (isLoading || metricsLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices: {error.message}</div>;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar active={active} setActive={setActive} />
      {active === "Dashboard" && (
        <DashboardSection
          data={metricsData}
          invoiceData={invoiceData}
          dateRange={dateRange}
          isDataLoading={metricsLoading}
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
