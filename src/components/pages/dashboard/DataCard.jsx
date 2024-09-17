import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptIcon } from "lucide-react";
import React from "react";

export default function DataCard({ title, icon, value }) {
  return (
    <Card className="min-w-[300px] lg:min-w-[25%]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
