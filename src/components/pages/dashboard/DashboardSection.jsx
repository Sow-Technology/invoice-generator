import React, { useEffect, useState } from 'react';
import DataCard from './DataCard';  // Adjust the import path if necessary
import Invoices from './Invoices';
import { DateRangePicker } from '@/components/ui/date-range-picker';

const DashboardSection = () => {
  const [data, setData] = useState({
    numOfOrders: 0,
    storeSale: 0,
    numOfCustomers: 0,
    numOfRepeatedCustomers: 0
  });
  const [invoiceData, setInvoiceData] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: '2024-09-12',  // Default start date
    to: '2024-09-17'    // Default end date
  });
  const [storeName, setStoreName] = useState('Quality Goods');  // Default store name
  const [storeNames, setStoreNames] = useState([]);

  useEffect(() => {
    const fetchStoreNames = async () => {
      try {
        const response = await fetch('/api/stores'); // Fetch store names from the new API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setStoreNames(result.storeNames || []);
      } catch (error) {
        console.error('Failed to fetch store names:', error);
      }
    };

    fetchStoreNames();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard data
        const dashboardResponse = await fetch(`/api/dashboard?storeName=${encodeURIComponent(storeName)}&startDate=${dateRange.from}&endDate=${dateRange.to}`);
        if (!dashboardResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const dashboardResult = await dashboardResponse.json();
        setData({
          numOfOrders: dashboardResult.numOfOrders || 0,
          storeSale: dashboardResult.storeSale || 0,
          numOfCustomers: dashboardResult.numOfCustomers || 0,
          numOfRepeatedCustomers: dashboardResult.numOfRepeatedCustomers || 0
        });

        // Fetch invoice data
        const invoicesResponse = await fetch(`/api/invoices?storeName=${encodeURIComponent(storeName)}&startDate=${dateRange.from}&endDate=${dateRange.to}`);
        if (!invoicesResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const invoicesResult = await invoicesResponse.json();
        setInvoiceData(invoicesResult || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [storeName, dateRange]);

  const handleStoreChange = (event) => {
    setStoreName(event.target.value);
  };

  const numberOfOrders = data.numOfOrders.toLocaleString();
  const storeSale = `₹${data.storeSale.toLocaleString()}`;
  const numberOfCustomers = data.numOfCustomers.toLocaleString();
  const repeatedCustomers = data.numOfRepeatedCustomers.toLocaleString();

  return (
    <div className="flex flex-1 flex-col sm:py-4">
      <div>
        <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
          <h2 className="text-3xl font-bold">Overview</h2>
          <div className="flex items-center gap-3">
            <select
              value={storeName}
              onChange={handleStoreChange}
              className="border p-2 rounded"
            >
              {storeNames.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
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

        <div className="flex w-full flex-wrap flex-row items-center justify-between max-w-[85vw] mx-auto">
          <DataCard
            title="No. of Orders"
            value={numberOfOrders}
          />
          <DataCard
            title="Store Sale"
            value={storeSale}
          />
          <DataCard
            title="No. of Customers"
            value={numberOfCustomers}
          />
          <DataCard
            title="No. of Repeated Customers"
            value={repeatedCustomers}
          />
        </div>

        <div className=''>
          <Invoices data={invoiceData} />
        </div>
      </div>
      {/* Additional Charts Below */}
    </div>
  );
};

export default DashboardSection;
