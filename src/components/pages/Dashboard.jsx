"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { startOfQuarter, format } from "date-fns";
import Invoices from "./dashboard/Invoices";
import Sidebar from "./dashboard/Sidebar";
import { useState, useEffect } from "react";
import DashboardSection from "./dashboard/DashboardSection";
import { useSession } from "next-auth/react";
import Products from "./dashboard/products/Products";
import UserPanel from "../../app/user-panel/page";
import { useSearchParams } from "next/navigation";
import Stores from "./dashboard/stores/Stores";
import CouponsTable from "./dashboard/coupons/Coupons";
import Users from "./dashboard/users/Users";

export default function Dashboard() {
  const session = useSession();
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("active") || "Dashboard";

  const [active, setActive] = useState(activeSection);
  const [storeName, setStoreName] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: startOfQuarter(new Date()),
    to: new Date(),
  });

  const formattedFrom = format(dateRange.from, "yyyy-MM-dd");
  const formattedTo = format(dateRange.to, "yyyy-MM-dd");

  const {
    data: invoiceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoices", formattedFrom, formattedTo, storeName],
    queryFn: async () => {
      const response = await axios.get("/api/getInvoices", {
        params: {
          from: formattedFrom,
          to: formattedTo,
          storeName,
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

  // Update URL search parameters when active section changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("active", active);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }, [active]);
  if (isLoading || metricsLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices: {error.message}</div>;

  return (
    <div className="flex min-h-screen w-full relative">
      <Sidebar active={active} setActive={setActive} />
      {active === "Dashboard" && (
        <DashboardSection
          data={metricsData}
          invoiceData={invoiceData}
          dateRange={dateRange}
          isDataLoading={metricsLoading}
          setDateRange={setDateRange}
          storeName={storeName}
          setStoreName={setStoreName}
        />
      )}
      {active === "Invoices" && <Invoices data={invoiceData} />}
      {active === "Coupons" && <CouponsTable />}
      {active === "Products" && <Products />}
      {active === "Stores" && <Stores />}
      {active === "Users" && <Users data={invoiceData} />}
    </div>
  );
}
