"use client";

import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
