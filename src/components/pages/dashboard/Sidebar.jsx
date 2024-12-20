"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Money } from "@mui/icons-material";
import {
  BarChartIcon,
  BriefcaseMedical,
  FormInput,
  LayoutDashboardIcon,
  MoreHorizontal,
  MoreVertical,
  Receipt,
  ReceiptIcon,
  Store,
  TicketCheck,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";

// Define different access lists for different roles
const roleAccess = {
  superAdmin: [
    "Invoices",
    "Dashboard",
    "Order Form",
    "Coupons",
    "Products",
    "Stores",
    "Medical History",
    "Users",
    "Expense Table",
    "Quotes",
  ],
  manager: [
    "Invoices",
    "Dashboard",
    "Products",
    "Medical History",
    "Order Form",
  ],
};

export default function Sidebar({ active, setActive, user }) {
  const [open, setOpen] = useState(true);

  // Get user access based on role
  const userAccess = (user && roleAccess[user.role]) || [];

  return (
    <aside
      className={cn(
        "bg-gray-50 z-10 flex h-screen flex-col transition-all duration-300 pt-4 md:pt-10 shadow-lg pl-2",
        open ? "w-64 sticky left-0 top-0" : "w-16 sticky left-0 top-0"
      )}
    >
      {/* Sidebar Header with Logo */}
      <div className="flex items-center justify-between px-4 py-4">
        <Image
          src={open ? "/logo.svg" : "/icon.svg"}
          alt=""
          width={open ? 180 : 50}
          height={50}
          className="transition-all duration-300 -my-[68px]"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 py-2 text-gray-700 max-h-[80vh] scroll no-scrollbar overflow-y-scroll">
        <TooltipProvider>
          {userAccess.map((item) => (
            <div
              key={item}
              className={cn(
                "flex items-center gap-3 cursor-pointer px-4 py-3 hover:bg-gray-200 rounded-lg",
                active == item && "bg-blue-600 text-white"
              )}
              onClick={() => setActive(item)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                  >
                    {getIcon(item)}
                  </Link>
                </TooltipTrigger>
                {!open && <TooltipContent side="right">{item}</TooltipContent>}
              </Tooltip>
              {open && <span>{item}</span>}
            </div>
          ))}
        </TooltipProvider>
      </nav>

      {/* Sign out button */}
      <div className="mt-auto px-2 py-4 flex items-center justify-between bg-muted/30 rounded-xl">
        <div
          onClick={() => setActive("Profile")}
          className="flex gap-2 items-center"
        >
          {" "}
          <div className="w-6 h-6 rounded-full bg-muted"></div>
          <div className="text-[10px]">
            <p className="font-bold text-xs">{user?.name || "Name"}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActive("Profile")}>
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  signOut();
                  redirect("/auth");
                }}
                className="gap-1.5 flex justify-between bg-rose-500 text-white "
              >
                Sign out
                <PiSignOutBold className="h-4 w-5" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}

// Function to get icons based on the item
function getIcon(item) {
  switch (item) {
    case "Invoices":
      return <ReceiptIcon className="h-5 w-5" />;
    case "Order Form":
      return <FormInput className="h-5 w-5" />;
    case "Dashboard":
      return <LayoutDashboardIcon className="h-5 w-5" />;
    case "Analytics":
      return <BarChartIcon className="h-5 w-5" />;
    case "Coupons":
      return <TicketCheck className="h-5 w-5" />;
    case "Products":
      return <AiFillProduct className="h-5 w-5" />;
    case "Stores":
      return <Store className="h-5 w-5" />;
    case "Users":
      return <Users className="h-5 w-5" />;
    case "Medical History":
      return <BriefcaseMedical className="h-5 w-5" />;
    case "Expense Table":
      return <Money className="h-5 w-5" />;
    case "Quotes":
      return <TicketCheck className="h-4 w-4 md:h-5 md:w-5" />;
    default:
      return null;
  }
}
