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
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

export default function Sidebar({ active, setActive, user }) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={cn(
        "z-10 flex h-screen flex-col transition-all duration-300 pt-4 md:pt-10",
        open
          ? // ? "w-full md:w-60 fixed md:sticky md:bg-transparent bg-[#6E81CC] left-0 top-0"
            "w-40 md:w-60 sticky bg-transparent left-0 top-0"
          : "w-16 sm:w-20 fixed md:sticky top-0"
      )}
    >
      <Image
        src={open ? "/logo.svg" : "/icon.svg"}
        alt=""
        width={200}
        height={100}
        className="p-2 max-w-full h-auto"
      />
      {/* <IoMdArrowDroprightCircle
        onClick={() => setOpen(!open)}
        className={cn(
          "text-3xl md:text-4xl text-accent-foreground mx-4 cursor-pointer transition-transform duration-300 ",
          open ? "rotate-180" : "rotate-0"
        )}
      /> */}

      <nav className="flex flex-col justify-start gap-2 md:gap-4 py-2 md:py-5 text-accent-foreground">
        <TooltipProvider>
          {[
            "Invoices",
            "Dashboard",
            "Analytics",
            "Coupons",
            "Products",
            "Stores",
            "Users",
          ].map((item) => (
            <div
              key={item}
              className={cn(
                "flex items-center justify-start gap-2 cursor-pointer hover:scale-105 pl-4 md:pl-6",
                active == item && "bg-white text-black rounded-l-full p-2",
                item == Users && user.role != "superAdmin" && "hidden"
              )}
              onClick={() => setActive(item)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg transition-colors"
                  >
                    {getIcon(item)}
                  </Link>
                </TooltipTrigger>
                {!open && <TooltipContent side="right">{item}</TooltipContent>}
              </Tooltip>
              {open && <span className="text-sm md:text-base">{item}</span>}
            </div>
          ))}
        </TooltipProvider>
      </nav>

      <nav
        className="mt-auto flex items-center gap-2 px-2 py-3 md:py-5 md:px-6 cursor-pointer text-accent-foreground"
        onClick={() => {
          signOut();
          redirect("/auth");
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-start rounded-lg text-accent-foreground transition-colors"
              >
                <PiSignOutBold className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </TooltipTrigger>
            {!open && <TooltipContent side="right">Sign out</TooltipContent>}
            {open && <span className="text-sm md:text-base">Sign out</span>}
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

function getIcon(item) {
  switch (item) {
    case "Invoices":
      return <ReceiptIcon className="h-5 w-5 md:h-6 md:w-6" />;
    case "Dashboard":
      return <LayoutDashboardIcon className="h-5 w-5 md:h-6 md:w-6" />;
    case "Analytics":
      return <BarChartIcon className="h-5 w-5 md:h-6 md:w-6" />;
    case "Coupons":
      return <TicketCheck className="h-5 w-5 md:h-6 md:w-6" />;
    case "Products":
      return <AiFillProduct className="h-4 w-4 md:h-5 md:w-5" />;
    case "Stores":
      return <Store className="h-4 w-4 md:h-5 md:w-5" />;
    case "Users":
      return <Users className="h-4 w-4 md:h-5 md:w-5" />;
    default:
      return null;
  }
}
