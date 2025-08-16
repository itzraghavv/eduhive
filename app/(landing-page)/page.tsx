import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <section className="max-w-3xl text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Meet Your Personal Study Assistant
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
            Chat with an AI that understands your academic needs. Get help with
            concepts, notes, videos, and more — all in one place.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Link href="/chat" className="text-white">Get Started</Link>
          </Button>
          <Button variant="outline" className="border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg font-semibold transition-all duration-300">
            Live Demo
          </Button>
        </div>
      </section>

      <section className="mt-20 max-w-2xl w-full relative z-10">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
          <CardContent className="p-8 space-y-4">
            <div className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explain Quantum Physics in simple terms.
            </div>
            <p className="text-gray-600 leading-relaxed">
              Sure! Quantum physics is the study of how very tiny things like
              atoms and particles behave. It's like discovering that the rules of
              the everyday world don't apply at the smallest scales...
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-600">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              AI is thinking...
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-20 w-full max-w-4xl text-center space-y-8 relative z-10">
        <h2 className="text-3xl font-bold text-gray-800">Why use our Chatbot?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-3">📘</div>
            <h3 className="font-semibold text-gray-800 mb-2">Context-Aware Study Help</h3>
            <p className="text-gray-600 text-sm">Get personalized assistance based on your learning context</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-3">🎥</div>
            <h3 className="font-semibold text-gray-800 mb-2">Video Summarization</h3>
            <p className="text-gray-600 text-sm">Extract key insights from educational videos automatically</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Notes</h3>
            <p className="text-gray-600 text-sm">Create and organize smart notes with AI assistance</p>
          </div>
        </div>
      </section>

      {/* Additional feature section */}
      <section className="mt-20 w-full max-w-5xl relative z-10">
        <div className="bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl p-8 border border-indigo-200/30">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Ready to transform your learning?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of students who are already using AI to enhance their academic journey.
            </p>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Link href="/chat" className="text-white">Start Learning Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
