import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      <section className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Meet Your Personal Study Assistant
        </h1>
        <p className="text-muted-foreground text-lg">
          Chat with an AI that understands your academic needs. Get help with
          concepts, notes, videos, and more — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Button>
            <Link href="/chat">Get Started</Link>
          </Button>
          <Button variant="outline">Live Demo</Button>
        </div>
      </section>

      <section className="mt-16 max-w-xl w-full">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-xl font-semibold">
              Explain Quantum Physics in simple terms.
            </div>
            <p className="text-muted-foreground">
              Sure! Quantum physics is the study of how very tiny things like
              atoms and particles behave...
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-16 w-full max-w-3xl text-center space-y-6">
        <h2 className="text-2xl font-semibold">Why use our Chatbot?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <li className="bg-muted rounded-xl p-4">
            📘 Context-Aware Study Help
          </li>
          <li className="bg-muted rounded-xl p-4">🎥 Video Summarization</li>
          <li className="bg-muted rounded-xl p-4">📝 AI-Powered Notes</li>
          <li className="bg-muted rounded-xl p-4">📝 AI-Powered Notes</li>
        </ul>
      </section>
    </main>
  );
}
