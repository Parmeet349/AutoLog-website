"use client";

import React, { useState } from "react";

export default function PushNotificationAdminPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [password, setPassword] = useState("");
  const [target, setTarget] = useState<"all" | "pro" | "free">("all");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setStatusMsg({ text: "Please enter the admin password.", error: true });
      return;
    }
    if (!title.trim() || !body.trim()) {
      setStatusMsg({ text: "Please provide both title and body content.", error: true });
      return;
    }

    try {
      setLoading(true);
      setStatusMsg(null);

      const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://api.autolog.ca/api";
      const res = await fetch(`${API_URL}/admin/send-push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, target, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ text: data.msg || "Push notification sent successfully!" });
        setTitle("");
        setBody("");
      } else {
        setStatusMsg({ text: data.msg || "Failed to send push notification.", error: true });
      }
    } catch (err) {
      console.error("Error sending push notification:", err);
      setStatusMsg({ text: "Network error sending push notification.", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Promotional <span className="text-[#FF5C1A]">Push Notifications</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Send custom push notifications directly to active app users.
          </p>
        </div>

        <form onSubmit={handleSendNotification} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          {statusMsg && (
            <div
              className={`p-4 rounded-xl text-sm font-medium border ${
                statusMsg.error
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter admin authorization password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5C1A] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Audience Target
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["all", "pro", "free"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTarget(t)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-bold capitalize transition-all border ${
                    target === t
                      ? "bg-[#FF5C1A] text-white border-[#FF5C1A] shadow-lg shadow-[#FF5C1A]/25"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {t === "all" ? "All Users" : `${t.toUpperCase()} Users`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Notification Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 🚗 Summer Fuel Savings & Insights!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5C1A] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Notification Body Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="e.g. Upgrade to AutoLog Pro today for unlimited vehicle garage tracking & live diagnostic reports."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5C1A] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-[#FF5C1A] hover:bg-[#ff4500] text-white font-extrabold text-base tracking-wide shadow-xl shadow-[#FF5C1A]/30 transition-all transform active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Dispatching Notifications..." : "🚀 Send Push Notification"}
          </button>
        </form>

        {/* Live Preview Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Mobile Device Notification Preview
          </h3>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#FF5C1A] flex items-center justify-center flex-shrink-0 text-white font-black text-xs shadow-md">
              AL
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-xs font-bold text-gray-300">AutoLog</span>
                <span className="text-[10px] text-gray-500">now</span>
              </div>
              <p className="text-sm font-semibold text-white truncate">
                {title || "Notification Title"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                {body || "Your custom notification message content will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
