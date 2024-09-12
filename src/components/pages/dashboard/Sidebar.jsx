"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  BarChartIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  SettingsIcon,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { IoMdArrowDroprightCircle } from "react-icons/io";

export default function Sidebar({ active, setActive }) {
  const [open, setOpen] = useState(false);

  return (
    <aside
      className={cn(
        "sticky inset-y-0 left-0 z-10 flex h-[98vh] flex-col border-r bg-background transition-all duration-300",
        open ? "w-64 " : "w-20 "
      )}
    >
      {/* Sidebar toggle button */}
      <IoMdArrowDroprightCircle
        onClick={() => setOpen(!open)}
        className={cn(
          "text-4xl text-emerald-500 m-5 cursor-pointer transition-transform duration-300",
          open ? "rotate-180" : "rotate-0"
        )}
      />

      {/* Navigation Menu */}
      <nav className="flex flex-col justify-start gap-4 px-2 sm:py-5 sm:px-6">
        <TooltipProvider>
          {/* Invoices */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Invoices")}
          >
            <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              <ReceiptIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            {open && <span>Invoices</span>}
          </div>

          {/* Dashboard */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Dashboard")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground"
                >
                  <LayoutDashboardIcon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              {!open && <TooltipContent side="right">Dashboard</TooltipContent>}
            </Tooltip>
            {open && <span>Dashboard</span>}
          </div>

          {/* Analytics */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Analytics")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BarChartIcon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              {!open && <TooltipContent side="right">Analytics</TooltipContent>}
            </Tooltip>
            {open && <span>Analytics</span>}
          </div>

          {/* Coupons */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Coupons")}
          >
            <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              <Ticket className="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            {open && <span>Coupons</span>}
          </div>

          {/* Products */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Products")}
          >
            <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground">
              <AiFillProduct className="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            {open && <span>Products</span>}
          </div>
        </TooltipProvider>
      </nav>

      {/* Settings at the bottom */}
      <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5 sm:px-6 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground "
              >
                <SettingsIcon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            {!open && <TooltipContent side="right">Settings</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}