import React, { useEffect, useState } from "react";
import DataCard from "./DataCard"; // Adjust the import path if necessary
import Invoices from "./Invoices";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { storesData } from "@/lib/data";

const DashboardSection = ({
  data,
  invoiceData,
  dateRange,
  setDateRange,
  isDataLoading,
}) => {
  const [storeName, setStoreName] = useState(); // Default store name
  const [storeNames, setStoreNames] = useState([]);

  useEffect(() => {
    const fetchStoreNames = async () => {
      try {
        const response = await fetch("/api/stores"); // Fetch store names from the new API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setStoreNames(result.storeNames || []);
      } catch (error) {
        console.error("Failed to fetch store names:", error);
      }
    };

    fetchStoreNames();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard data
        const dashboardResponse = await fetch(
          `/api/dashboard?storeName=${encodeURIComponent(
            storeName
          )}&startDate=${dateRange.from}&endDate=${dateRange.to}`
        );
        if (!dashboardResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const dashboardResult = await dashboardResponse.json();
        // Process and set dashboard data as needed
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [storeName, dateRange]);

  const handleStoreChange = (event) => {
    setStoreName(event.target.value);
  };

  return (
    <div className="flex flex-1 flex-col sm:py-4">
      <div>
        <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
          <h2 className="text-3xl font-bold">Overview</h2>
          <div className="flex items-center gap-3">
            {/* <select
              value={storeName}
              onChange={handleStoreChange}
              className="border p-2 rounded"
            >
              {storeNames.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select> */}
            <Select
              defaultValue="all"
              value={storeName}
              onValueChange={setStoreName}
            >
              <SelectTrigger className="min-w-[200px]">
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

        <div className="flex w-full flex-wrap gap-5 flex-row items-center justify-around max-w-[85vw] mx-auto ">
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

        <div className="">
          <Invoices data={invoiceData} />
        </div>
      </div>
    </div>
   
    
  );
};

export default DashboardSection;
