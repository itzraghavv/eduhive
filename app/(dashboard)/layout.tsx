"use client";

import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const { data: session } = useSession();
  // const currentUserId = session?.user?.id;

  return (
    <SessionProvider>
      <Navbar />
      <main className="ml-16 flex-1 transition-all duration-300">
        {children}
      </main>
    </SessionProvider>
  );
}
