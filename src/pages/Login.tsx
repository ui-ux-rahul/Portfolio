/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
  onNavigate: (page: string) => void;
}

export default function Login({ onLoginSuccess, onNavigate }: LoginProps) {
  const [email, setEmail] = useState("workprofile.uiux@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onLoginSuccess(result.token);
        onNavigate("admin");
      } else {
        setError(result.message || "Authentication failed. Please check your credentials.");
      }
    } catch (e) {
      console.error("Login error:", e);
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 min-h-screen bg-white dark:bg-[#090807] text-[#1A1A1A] dark:text-zinc-200 flex items-center justify-center transition-colors duration-300 relative z-10 overflow-hidden">
      {/* Decorative ambient halos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[35%] right-[25%] w-[350px] h-[300px] bg-[#4285F4]/5 dark:bg-[#4285F4]/3 blur-[100px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative w-full max-w-md mx-4 z-10 animate-fade-in">
        {/* Card Frame */}
        <div className="bg-white dark:bg-[#121110] rounded-[28px] p-8 border border-gray-200 dark:border-zinc-800/80 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900/60 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800/80 font-mono mb-4 uppercase tracking-widest">
              CONSOLE
            </div>
            <h1 className="font-display text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight">
              Sign In
            </h1>
            <p className="text-[10px] text-[#5F6368] dark:text-zinc-400 mt-2 uppercase tracking-wider font-mono">
              Access the administrator system to update platform nodes & blogs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error alerts */}
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300 flex items-start gap-2.5 text-xs leading-relaxed">
                <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-[#1A1A1A] dark:text-white text-xs focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-mono"
                  placeholder="workprofile.uiux@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[9px] font-bold text-[#5F6368] dark:text-zinc-400 uppercase tracking-widest font-mono mb-2">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-[#1A1A1A] dark:text-white text-xs focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#000000] dark:bg-white text-white dark:text-black font-bold hover:opacity-90 active:scale-98 transition-all duration-200 disabled:opacity-50 cursor-pointer text-xs gap-2 uppercase tracking-wider shadow-md"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Unlock Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Return footer */}
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-zinc-800/80 text-center">
            <button
              onClick={() => onNavigate("home")}
              className="text-[9px] font-mono uppercase tracking-widest text-[#5F6368] dark:text-zinc-400 hover:text-[#1A1A1A] dark:hover:text-white font-bold transition-colors cursor-pointer"
            >
              Back to Home Page
            </button>
          </div>

         </div>
       </div>
    </div>
  );
}
