"use client";

import { useState } from "react";
import {
  Home,
  ClipboardList,
  BookOpen,
  MessageSquare,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

import { useSession } from "next-auth/react";

const navItems = [
  // TODO - change the href to something other than home, currently set to chat
  { icon: Home, label: "Home", href: "/chat" },
  //   { icon: ClipboardList, label: "Tasks", href: "/tasks" },
  { icon: BookOpen, label: "Notes", href: "/notes" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: Users, label: "Friends", href: "/friends" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "fixed top-0 left-0 h-full z-30 overflow-hidden transition-all duration-100 ease-in-out bg-black border-r border-gray-800",
        isHovered ? "w-48" : "w-16"
      )}
    >
      <div className="flex flex-col gap-2 pt-4 px-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center text-gray-300 p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <div className="min-w-[20px] flex justify-center items-center">
              <item.icon size={20} className="shrink-0" />
            </div>
            <span
              className={clsx(
                "ml-3 transition-all duration-300 whitespace-nowrap overflow-hidden",
                isHovered ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
        {/* {currentUserId && <p className="text-3xl text-blue-800">Y</p>} */}
      </div>
    </div>
  );
}
