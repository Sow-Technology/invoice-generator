import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChartIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  SettingsIcon,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex h-full w-14 flex-col border-r bg-background sm:w-64 sm:flex-row sm:items-start sm:justify-between">
      <nav className="flex flex-col  justify-start  gap-4 px-2 sm:py-5 sm:px-6">
        <TooltipProvider>
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Invoices")}
          >
            {" "}
            <div
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <ReceiptIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Invoices</span>
            </div>
            Invoices
          </div>
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Dashboard")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <LayoutDashboardIcon className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            Dashboard
          </div>
          <div
            className="flex items-center justify-start gap-2  cursor-pointer hover:scale-105"
            onClick={() => setActive("Analytics")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <BarChartIcon className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
            Analytics
          </div>
          <div
            className="flex items-center justify-start gap-2 cursor-pointer hover:scale-105"
            onClick={() => setActive("Coupons")}
          >
            {" "}
            <div
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <Ticket className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Coupons</span>
            </div>
            Coupons
          </div>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5 sm:px-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                prefetch={false}
              >
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
