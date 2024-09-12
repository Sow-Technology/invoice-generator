"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster } from "../ui/sonner";

export default function RootProviders({ children }) {
  const [queryClient] = useState(() => new QueryClient({}));
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <Toaster position="top-center" />
      {children}
    </QueryClientProvider>
  );
}
