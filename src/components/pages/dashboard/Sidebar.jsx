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
  Store,
  TicketCheck,
  Users,
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
        "z-10 flex h-[100vh] flex-col border-r bg-background transition-all duration-300",
        open ? "w-60 md:sticky fixed  top-0" : "w-20 sticky sm:top-0"
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
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hidden sm:flex items-center">
                  {open ? (
                    ""
                  ) : (
                    <TooltipContent side="right">Invoices</TooltipContent>
                  )}
                </div>
              </TooltipTrigger>
            </Tooltip>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <TicketCheck className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              {!open && <TooltipContent side="right">Coupons</TooltipContent>}
            </Tooltip>
            {open && <span>Coupons</span>}
          </div>

          {/* Products */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Products")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <AiFillProduct className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              {!open && <TooltipContent side="right">Products</TooltipContent>}
            </Tooltip>
            {open && <span>Products</span>}
          </div>

          {/* Stores */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Stores")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Store className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              {!open && <TooltipContent side="right">Stores</TooltipContent>}
            </Tooltip>
            {open && <span>Stores</span>}
          </div>

          {/* User Panel */}
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Users")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              {!open && <TooltipContent side="right">Users</TooltipContent>}
            </Tooltip>
            {open && <span>Users</span>}
          </div>
        </TooltipProvider>
      </nav>

      {/* Settings at the bottom */}
      <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5 sm:px-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
