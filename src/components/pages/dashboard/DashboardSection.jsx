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
} from "lucide-react";

const DashboardSection = ({
  data,
  invoiceData,
  dateRange,
  setDateRange,
  isDataLoading,
  storeName,
  setStoreName,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-10 rounded-3xl sm:pt-4 w-full">
      <div className="p-6 bg-slate-50 rounded-xl shadow-md w-full">
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
                {storesData.map((store) => (
                  <SelectItem key={store.name} value={store.name}>
                    {store.name}
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

        <div className="flex flex-wrap justify-between gap-2 items-stretch gap-y-7">
          <Card className="bg-white min-w-[250px] lg:w-[500px]">
            <CardHeader>
              <CardTitle>Client Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientSources data={data.clientSourceSummary} />
            </CardContent>
          </Card>

          <div className="flex justify-between items-center flex-col">
            <SkeletonWrapper isLoading={isDataLoading}>
              <DataCard
                title="Total Orders"
                value={data.totalOrders}
                icon={<Receipt className="h-8 w-8 text-white" />}
              />
            </SkeletonWrapper>
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
                  <DollarSign className="h-8 w-8  text-white drop-shadow-2xl" />
                }
              />
            </SkeletonWrapper>
          </div>
          <div className="flex justify-between items-center flex-col">
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
                icon={<DollarSign className="h-8 w-8 text-white" />}
              />
            </SkeletonWrapper>
          </div>
          <div className="flex justify-between items-center flex-col">
            <SkeletonWrapper isLoading={isDataLoading}>
              <DataCard
                title="Total Customers"
                value={data.totalCustomers}
                icon={<Users className="h-8 w-8 text-white" />}
              />
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={isDataLoading}>
              <DataCard
                title="Repeat Customers"
                value={data.totalRepeatedCustomers}
                icon={<Repeat className="h-8 w-8 text-white" />}
              />
            </SkeletonWrapper>
          </div>
          <SkeletonWrapper isLoading={isDataLoading}>
            <DataCard
              title="Total Tax Collected"
              value={`₹${Number(data.totalTaxValue).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              icon={<FileText className="h-8 w-8 text-white" />}
            />
          </SkeletonWrapper>
          <Card className="bg-white min-w-[250px] w-[600px]">
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentStatus data={data.paymentStatusSummary} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="p-6 bg-slate-50 rounded-xl shadow-md w-full">
        <Analytics />
      </div>
      <div className="bg-white rounded-3xl p-10 my-10 max-w-full">
        <h3 className="text-3xl font-medium mb-4">Recent Invoices</h3>
        <Invoices data={invoiceData} />
      </div>
    </div>
  );
};

export default DashboardSection;
