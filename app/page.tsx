"use client";

import Image from "next/image";
import { useState } from "react";
import ChatPage from "./chat/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between w-full"></header>
      {/* <main className="flex flex-col items-center justify-center w-full"> */}
      <ChatPage />
      {/* </main> */}
      {/* <footer></footer> */}
    </div>
  );
}
