"use client";

import Sidebar from "./dashboard/Sidebar";
import { useState } from "react";
import DataCard from "./dashboard/DataCard";
import Invoices from "./dashboard/Invoices";
import DashboardSection from "./dashboard/DashboardSection";
import Coupons from "./dashboard/Coupons";
import { useQuery } from "@tanstack/react-query";
import InventoryPage from "./inventory/page";
const data = [
  {
    orderNumber: "JO001",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Rajendra Prasad",
  },
  {
    orderNumber: "JO002",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Akhil",
  },
  {
    orderNumber: "JO003",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Rajendra Prasad",
  },
  {
    orderNumber: "JO004",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Akhiolj",
  },
  {
    orderNumber: "JO005",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Raj Prasad",
  },
  {
    orderNumber: "JO006",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "AJ LK",
  },
  {
    orderNumber: "JO007",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "KK Singh",
  },
  {
    orderNumber: "JO008",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Raj Prasad",
  },
  {
    orderNumber: "JO009",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Raju M",
  },
  {
    orderNumber: "JO010",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "RK MM",
  },
  {
    orderNumber: "JO011",
    date: new Date("2023-05-01"),
    subTotal: "₹2500",
    customerName: "Jeru",
  },
];
export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  console.log(active);
  const invoiceData = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetch(`/api/getInvoices`),
  });
  console.log("inv data");
  console.log(invoiceData);
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar active={active} setActive={setActive} />
      {active == "Dashboard" && <DashboardSection data={data} />}
      {active == "Invoices" && <Invoices data={data} />}
      {active == "Coupons" && <Coupons />}
      {active == "Products" && <InventoryPage />}
    </div>
  );
}
