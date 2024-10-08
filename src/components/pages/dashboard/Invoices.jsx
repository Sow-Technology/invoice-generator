import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ArrowUpDown, PlusIcon, MoreVerticalIcon,MoreHorizontalIcon, PrinterIcon, TrashIcon } from "lucide-react"; // Import MoreVerticalIcon
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"; // For dropdown menu
import Link from "next/link";
import React from "react";

// Function to print the invoice details
const printInvoice = (invoice) => {
  const printWindow = window.open("", "_blank");
  const content = `
    <html>
      <head>
        <title>Print Invoice</title>
        <style>
          /* Add your custom styles here */
          body { font-family: Arial, sans-serif; }
          .invoice { padding: 20px; }
          .header { font-size: 24px; font-weight: bold; }
          .details { margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">Invoice Details</div>
          <div class="details">
            <p><strong>Invoice Number:</strong> ${invoice.orderNumber}</p>
            <p><strong>Customer Name:</strong> ${invoice.customerName}</p>
            <p><strong>Phone Number:</strong> ${invoice.phoneNumber}</p>
            <p><strong>Date:</strong> ${new Date(invoice.createdAt).toDateString()}</p>
            <p><strong>Amount:</strong> $${invoice.subTotal.toFixed(2)}</p>
            <p><strong>Store Name:</strong> ${invoice.storeName}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};

// Function to delete an invoice
const deleteInvoice = async (orderNumber) => {
  const response = await fetch(`/api/invoice`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderNumber }),
  });

  const result = await response.json();

  if (result.success) {
    alert('Invoice deleted successfully!');
    window.location.reload(); // Reload the page to reflect changes
  } else {
    alert('Failed to delete invoice: ' + result.message);
  }
};

// Define columns with sorting functionality
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ cell }) => {
      return new Date(cell.row.original.createdAt).toDateString();
    },
  },
  {
    accessorKey: "subTotal",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "storeName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Store Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "actions", // New column for actions
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontalIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => printInvoice(row.original)}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            <span>Print</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteInvoice(row.original.orderNumber)}>
            <TrashIcon className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function Invoices({ data }) {
  // Initialize sorting state
  const initialSortingState = [
    {
      id: "createdAt", // Column id to be sorted
      desc: true, // true for descending order
    },
  ];

  return (
    <div className="mx-5 max-lg:max-w-[83vw] max-w-[90vw] lg:min-w-max flex-1 custom-scrollbar">
      <Card className="w-full mt-5 h-max mx-auto">
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
            <DataTable
              columns={columns}
              data={data}
              initialSorting={initialSortingState}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
