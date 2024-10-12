"use client";
import React from "react";
import DataCard from "./DataCard";
import Invoices from "./Invoices";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { storesData } from "@/lib/data";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import Analytics from "./analytics/Analytics";
import ClientSources from "./analytics/ClientSources";
import PaymentStatus from "./analytics/PaymentStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Users,
  FileText,
  Calendar,
  DollarSign,
  Percent,
  Repeat,
  Receipt,
  IndianRupee,
} from "lucide-react";
import Past7DaysSales from "./analytics/Past7DaysSales";
import SalesByStore from "./analytics/SalesByStore";

const DashboardSection = ({
  data,
  invoiceData,
  dateRange,
  setDateRange,
  isDataLoading,
  stores,
  storeName,
  setStoreName,
}) => {
  console.log("=====METRICS=====", data);
  return (
    <div className="flex flex-1 flex-col gap-10 rounded-3xl sm:pt-4 w-full">
      <div className="p-6 bg-slate-50 rounded-xl shadow-md w-full flex flex-col gap-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex gap-4">
            {/* Store Selector */}
            <Select
              value={storeName}
              onValueChange={setStoreName}
              className="w-48"
            >
              <SelectTrigger>
                <SelectValue placeholder="Store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                {stores.map((store) => (
                  <SelectItem key={store.code} value={store.code}>
                    {store.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DateRangePicker
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
              showCompare={false}
              className="w-full"
              onUpdate={(values) => {
                const { from, to } = values.range;
                if (!from || !to) return;
                setDateRange({ from, to });
              }}
            />
          </div>
        </div>
        <div className="flex justify-between gap-5 flex-auto">
          <div className="flex flex-col justify-between gap-10 ">
            {" "}
            <Card className="bg-white min-w-[250px] lg:w-[450px]">
              <CardHeader>
                <CardTitle>Client Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ClientSources data={data.clientSourceSummary} />
              </CardContent>
            </Card>
            <Card className="bg-white min-w-[250px] w-[450px]  flex-1">
              <CardHeader>
                <CardTitle>Sales By Store</CardTitle>
              </CardHeader>
              <CardContent>
                <SalesByStore data={data.salesByStore} />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-10 flex-wrap justify-between">
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Total Revenue"
                  value={`₹${Number(data.totalOrderValue).toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`}
                  icon={
                    <IndianRupee className="h-8 w-8  text-white drop-shadow-2xl" />
                  }
                />
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Total Profit"
                  value={`₹${Number(data.totalProfit).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  icon={<Percent className="h-8 w-8 text-white" />}
                />
              </SkeletonWrapper>{" "}
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Total Orders"
                  value={data.totalOrders}
                  icon={<Receipt className="h-8 w-8 text-white" />}
                />
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Repeat Customers"
                  value={data.totalRepeatedCustomers}
                  icon={<Repeat className="h-8 w-8 text-white" />}
                />
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Total Tax Collected"
                  value={`₹${Number(data.totalTaxValue).toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}`}
                  icon={<FileText className="h-8 w-8 text-white" />}
                />
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Total Profit"
                  value={`₹${Number(data.totalProfit).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  icon={<Percent className="h-8 w-8 text-white" />}
                />
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Aspire 15%"
                  value={`₹${Number(data.aspire15).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  icon={<IndianRupee className="h-8 w-8 text-white" />}
                />
              </SkeletonWrapper>
              <SkeletonWrapper isLoading={isDataLoading}>
                <DataCard
                  title="Total Customers"
                  value={data.totalCustomers}
                  icon={<Users className="h-8 w-8 text-white" />}
                />
              </SkeletonWrapper>
            </div>
          </div>
          <div className="flex flex-col gap-10 flex-1">
            {" "}
            <Card className="bg-white min-w-[250px] w-auto flex-1">
              <CardHeader>
                <CardTitle>Invoice Status</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentStatus data={data.paymentStatusSummary} />
              </CardContent>
            </Card>
            <Card className="bg-white min-w-[250px] w-[500px] flex-1">
              <CardHeader>
                <CardTitle>Daily Sales (Past 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <Past7DaysSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="p-6 bg-slate-50 rounded-xl shadow-md w-full">
        <Analytics />
      </div>
      <div className="">
        <Invoices data={invoiceData} />
      </div>
    </div>
  );
};

export default DashboardSection;
