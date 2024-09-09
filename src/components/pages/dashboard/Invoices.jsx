import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ArrowUpDown, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
const columns = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Invoice <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ cell }) => {
      return cell.row.original.date.toLocaleDateString();
    },
  },
  {
    accessorKey: "subTotal",
    header: "Amount",
  },
];
export default function Invoices({ data }) {
  return (
    <Card className="col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>
          Manage your invoices and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end">
            <Link href="/invoice">
              <Button size="sm" className="h-8 gap-1">
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Invoice
                </span>
              </Button>
            </Link>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
