import DashboardSection from "@/components/pages/Dashboard";
import React from "react";

const page = () => {
  return <DashboardSection
  data={{
    numberOfOrders: fetchedData.ordersCount,
    storeSale: fetchedData.totalSales,
    numberOfCustomers: fetchedData.customersCount,
    repeatedCustomers: fetchedData.repeatedCustomersCount,
  }}
  invoiceData={fetchedInvoiceData}
  dateRange={dateRange}
  setDateRange={setDateRange}
/>;
};

export default page;
