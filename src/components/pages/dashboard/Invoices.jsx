import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  ArrowUpDown,
  PlusIcon,
  MoreVerticalIcon,
  MoreHorizontalIcon,
  PrinterIcon,
  TrashIcon,
} from "lucide-react"; // Import MoreVerticalIcon
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"; // For dropdown menu
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
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            font-size:14px;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 10px solid rgb(40 53 146);
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .invoice-header h1 {
            color: #00008B;
          }
          .customer-details, .order-details {
            margin-bottom: 20px;

          }
          .customer-details p, .order-details p {
            margin: 5px 0;
          }
          .details-title {
            font-weight: bold;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .table th, .table td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          .table th {
            background-color: #f2f2f2;
            text-align: left;
          }
          .total-section {
            display: flex;
            flex-direction:column;
            justify-content: flex-end;
            margin-top: 20px;
          }
          .total-section p {
            margin: 5px 0;
          }
          .notes, .payment-mode {
            margin-top: 20px;
          }
          .paid-status {
            color: purple;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div>
        <p>${invoice.storeName}</p>
        <p>${invoice.address}</p>
        <p>${invoice.phoneNumber}</p>
        </div> 
        <div class="invoice">
          <div class="invoice-header">
            <div><img src="${invoice.logo}" alt="Company Logo" /></div>
          </div>
            <h1 style="color:rgb(40 53 146);">Invoice</h1>

          <div style="display:flex;">
          <div class="customer-details">
            <p class="details-title">Customer Name: <span>${
              invoice.customerName
            }</span></p>
            <p>Phone Number: ${invoice.phoneNumber}</p>
            <p>Email Id: ${invoice.emailId}</p>
          </div>
          <div style="margin-left:250px;" class="order-details">
            <p><strong>Order number:</strong> #${invoice.orderNumber}</p>
            <p><strong>Invoice date:</strong> ${new Date(
              invoice.createdAt
            ).toDateString()}</p>
            <p><strong>GST IN:</strong> 29BCNPT0590C1ZB </p>
          </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.code}</td>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>${item.unitPrice}</td>
                  <td>${item.discount}</td>
                  <td>${item.total}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div style="margin-left:530px;" class="total-section">
            <p>Tax: ₹${invoice.taxValue.toFixed(2)}</p><br />
            <p>SubTotal: ₹${invoice.subTotal.toFixed(2)}</p><br />
            <p class="paid-status">Paid: ₹${invoice.paid}</p>
          </div>
          <div class="payment-mode">
            <p><strong>Payment Mode:</strong> ${invoice.paymentMode}</p>
          </div>
          <div class="notes">
            <p><strong>Additional notes:</strong> ${invoice.notes}</p>
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
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderNumber }),
  });

  const result = await response.json();

  if (result.success) {
    alert("Invoice deleted successfully!");
    window.location.reload(); // Reload the page to reflect changes
  } else {
    alert("Failed to delete invoice: " + result.message);
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
    accessorKey: "clientSource",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Client Source <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amountPaid",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Client Source <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <DropdownMenuItem
            onClick={() => deleteInvoice(row.original.orderNumber)}
          >
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
    <div className="mx-5 max-w-[85vw]  flex-1 custom-scrollbar">
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
