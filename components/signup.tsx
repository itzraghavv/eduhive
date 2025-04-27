"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/lib/validators";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status && session?.user) {
      const defaultData = {
        username: session.user.name || username,
        email: session.user.email || password,
        bio: "Hey there! I'm using EduHive.",
        image: "",
      };
      localStorage.setItem("user", JSON.stringify(defaultData));
    }
  }, [session, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      const validData = SignUpSchema.safeParse({ username, email, password });

      if (!validData.success) {
        console.log(validData.error);
        setMessage("Invalid Input");
        setLoading(false);
        return;
      }

      if (res.ok) {
        const loginRes = await signIn("credentials", {
          redirect: false,
          username: email,
          password,
        });

        if (loginRes?.ok) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              username,
              email,
              bio: "Hey there! I'm using EduHive.", // default bio
              image: "", // default image
            })
          );
          router.push("/chat");
        } else {
          setMessage("Signed up but failed to sign in.");
        }
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {message && (
          <p className="text-sm mb-3 text-center text-gray-600">{message}</p>
        )}

        <Input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};
