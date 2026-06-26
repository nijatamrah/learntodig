"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleSubmit() {
    setError("");

    if (!email || !email.includes("@")) {
      setError("Düzgün email daxil edin");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 mb-4">
            <svg className="w-6 h-6 text-[#FF6B2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Şifrəni unutdun?</h1>
          <p className="text-sm text-white/40">
            Email-ini daxil et, sıfırlama linki göndərərik
          </p>
        </div>

        {sent ? (
          /* Success state */
          <div className="text-center space-y-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 mb-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-400 font-medium text-sm">Link göndərildi!</p>
              <p className="text-emerald-400/70 text-xs mt-1">
                <span className="font-medium text-emerald-300">{email}</span> ünvanına sıfırlama linki göndərildi. Spam qovluğunu da yoxla.
              </p>
            </div>
            <Link
              href="/login"
              className="block text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ← Girişə qayıt
            </Link>
          </div>
        ) : (
          /* Form state */
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-white/60">
                Email ünvanı
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-[#FF6B2B]/50 focus:ring-1 focus:ring-[#FF6B2B]/30 transition-all"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-[13px] text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-xl bg-[#FF6B2B] py-3 text-[14px] font-bold text-white transition-all hover:bg-[#e55a1f] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Göndərilir...
                </span>
              ) : (
                "Sıfırlama linki göndər"
              )}
            </button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
              >
                ← Girişə qayıt
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}