import Navbar from "@/components/navbar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Navbar />
      <main className="ml-16 flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
