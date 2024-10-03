import React, { useEffect, useState } from "react";
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
    <div className="flex flex-1 flex-col bg-[#6E81CC8F]  rounded-3xl   sm:pt-4">
      <div className="p-4 rounded-3xl w-full">
        <div className="container flex flex-wrap items-end justify-between gap-2 py-6 ">
          <h2 className="text-5xl font-medium">Overview</h2>
          <div className="flex items-center max-lg:flex-wrap gap-3">
            <Select
              defaultValue="all"
              value={storeName}
              onValueChange={setStoreName}
            >
              <SelectTrigger className="md:min-w-[200px] min-w-[130px]">
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
              onUpdate={(values) => {
                const { from, to } = values.range;
                if (!from || !to) return;
                setDateRange({ from, to });
              }}
            />
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-5  flex-row items-center justify-around max-w-[85vw] mx-auto ">
          <SkeletonWrapper isLoading={isDataLoading}>
            <DataCard
              title="Total Orders"
              value={data.totalOrders}
              isLoading={isDataLoading}
            />
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isDataLoading}>
            <DataCard
              title="Total Revenue"
              isLoading={isDataLoading}
              value={`₹${Number(data.totalOrderValue).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isDataLoading}>
            <DataCard
              title="Total Customers"
              isLoading={isDataLoading}
              value={data.totalCustomers}
            />
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isDataLoading}>
            <DataCard
              title="Repeat Customers"
              isLoading={isDataLoading}
              value={data.totalRepeatedCustomers}
            />
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isDataLoading}>
            <DataCard
              title="Total Tax Collected"
              isLoading={isDataLoading}
              value={`₹${Number(data.totalTaxValue).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />
          </SkeletonWrapper>
        </div>
      </div>
      <div className="bg-[#6e81cc]/60 rounded-3xl  p-10 my-10">
        <Analytics />
      </div>
      <div className="bg-[#6e81cc]/60 rounded-3xl  py-10">
        <Invoices data={invoiceData} />
      </div>
    </div>
  );
};

export default DashboardSection;
