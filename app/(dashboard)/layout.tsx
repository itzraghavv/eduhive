"use client";

import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
// import "sonner/dist/sonner.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const { data: session } = useSession();
  // const currentUserId = session?.user?.id;

  return (
    <SessionProvider>
      <Navbar />
      <main className="ml-16 flex-1 transition-all duration-300">
        {children}
      </main>
      <Toaster position="bottom-center" expand={false} />
    </SessionProvider>
  );
}
