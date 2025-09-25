"use client";

import { db } from "@/utils/firebase.utils";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NotificationsSender() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "notifications"), {
        message: message.trim(),
        createdAt: serverTimestamp(),
      });

      setMessage("");
      toast.success("✅ Notification sent!");
    } catch (error) {
      console.error("Error adding notification: ", error);
      toast.error("❌ Failed to send notification. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-md items-center gap-2 rounded-xl border p-4 shadow-sm">
      <input
        type="text"
        placeholder="Enter notification message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-lg border px-3 py-2 focus:outline-none"
      />
      <button
        onClick={sendNotification}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
