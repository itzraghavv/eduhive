"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { NoResponse } from "@/components/auth";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUsername(parsed.username || "Jacklin Silva");
      setEmail(parsed.email || "jacklin@example.com");
      setBio(parsed.bio || "Fashion is my passion");
      setImage(
        parsed.image ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
      );
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { username, email, bio, image };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile updated!");
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6 items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <Loader2 className="animate-spin" />
        <p className="text-muted-foreground">
          Please wait while we load your chat.
        </p>
        <div className="loader mt-4"></div>
      </div>
    );
  }

  if (!session) {
    return <NoResponse />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
          />
          {isEditing && (
            <input
              className="mt-2 text-sm border px-2 py-1 rounded w-full text-center"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />
          )}

          <h2 className="text-xl font-bold mt-4">{username}</h2>
          <p className="text-sm text-gray-600">{email}</p>
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-2 w-full border rounded px-3 py-2 text-sm"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-sm text-gray-500 mt-2">{bio}</p>
          )}
        </div>

        <div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
