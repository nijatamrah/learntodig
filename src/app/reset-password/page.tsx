"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Supabase reset linkindən gələn session-u yoxla
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // Session quruldu, forma göstər
      }
    });
  }, [supabase]);

  async function handleSubmit() {
    setError("");

    if (password.length < 6) {
      setError("Şifrə minimum 6 simvol olmalıdır");
      return;
    }
    if (password !== confirm) {
      setError("Şifrələr uyğun deyil");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Şifrəni yenilə</h1>
          <p className="text-sm text-white/40">Yeni şifrənizi daxil edin</p>
        </div>

        {success ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-emerald-400">
            Şifrə uğurla yeniləndi! Ana səhifəyə yönləndirilirsiniz...
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-white/60">
                Yeni şifrə
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 simvol"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-[#FF6B2B]/50 focus:ring-1 focus:ring-[#FF6B2B]/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-white/60">
                Şifrəni təsdiqlə
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Şifrəni təkrar daxil edin"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder-white/20 outline-none focus:border-[#FF6B2B]/50 focus:ring-1 focus:ring-[#FF6B2B]/30"
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
              {loading ? "Yenilənir..." : "Şifrəni yenilə"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}