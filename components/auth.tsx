import { Button } from "./ui/button";
import Link from "next/link";

export function NoResponse() {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6 items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">Please login to continue</h1>
      <p className="text-muted-foreground">
        You need to be logged in to access this page.
      </p>
      <div className="flex flex-row gap-2 mt-2 p-4">
        <Button className="mt-4">
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button className="mt-4">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
