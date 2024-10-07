import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function DataCard({ title, icon, value }) {
  return (
    <Card className="lg:min-w-[300px] min-w-[210px] ">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="max-lg:text-xl">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="lg:text-4xl text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
