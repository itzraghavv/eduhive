"use client";

import Link from "next/link";
import Image from "next/image";
// import { useState } from "react";
import ChatPage from "./chat/page";
import { Button } from "@/components/ui/button";
import HomePage from "./(landing-page)/page";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    // <header className="flex items-center justify-between w-full"></header>
    <main className="flex-1 items-center justify-center w-full">
      <HomePage />
      <Button>
        <Link href="/notes">Notes</Link>
      </Button>
    </main>
  );
}
