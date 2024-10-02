// components/SalesDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, subDays, startOfYear, endOfYear } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [dailySales, setDailySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [yearlySales, setYearlySales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endDate = new Date();
      const startDate = subDays(endDate, 30);
      const currentYear = endDate.getFullYear();

      try {
        const dailyResponse = await axios.get(
          `/api/sales/daily?startDate=${format(
            startDate,
            "yyyy-MM-dd"
          )}&endDate=${format(endDate, "yyyy-MM-dd")}`
        );
        setDailySales(dailyResponse.data.data);

        const monthlyResponse = await axios.get(
          `/api/sales/monthly?year=${currentYear}`
        );
        setMonthlySales(monthlyResponse.data.data);

        const yearlyResponse = await axios.get(
          `/api/sales/yearly?startYear=${
            currentYear - 5
          }&endYear=${currentYear}`
        );
        setYearlySales(yearlyResponse.data.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Sales (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(new Date(date), "MMM dd")}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(date) =>
                  format(new Date(date), "MMM dd, yyyy")
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                name="Total Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales (Current Year)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(month) =>
                  format(new Date(2023, month - 1), "MMM")
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(month) =>
                  format(new Date(2023, month - 1), "MMMM")
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#82ca9d"
                name="Total Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yearly Sales (Last 5 Years)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#ffc658"
                name="Total Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
