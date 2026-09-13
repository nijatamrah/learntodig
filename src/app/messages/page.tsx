"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { MessageCircle, Search, Plus, X } from "lucide-react";

type ProfileLite = { id: string; full_name: string | null };

type ConversationRow = {
  id: string;
  user_a: string;
  user_b: string;
  last_message_at: string;
};

type ConversationView = {
  id: string;
  otherName: string;
  lastMessageAt: string;
};

export default function MessagesPage() {
  const supabase = createClient();
  const router = useRouter();

  const [myId, setMyId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationView[]>([]);
  const [loading, setLoading] = useState(true);

  const [showNew, setShowNew] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProfileLite[]>([]);
  const [searching, setSearching] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setMyId(user.id);

      const { data: convos } = await supabase
        .from("conversations")
        .select("id, user_a, user_b, last_message_at")
        .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
        .order("last_message_at", { ascending: false });

      const rows = (convos ?? []) as ConversationRow[];

      const otherIds = rows.map((c) => (c.user_a === user.id ? c.user_b : c.user_a));

      let namesById: Record<string, string> = {};
      if (otherIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", otherIds);
        namesById = Object.fromEntries(
          (profiles ?? []).map((p: ProfileLite) => [p.id, p.full_name || "İstifadəçi"])
        );
      }

      setConversations(
        rows.map((c) => ({
          id: c.id,
          otherName: namesById[c.user_a === user.id ? c.user_b : c.user_a] || "İstifadəçi",
          lastMessageAt: c.last_message_at,
        }))
      );
      setLoading(false);
    }
    load();
  }, [supabase, router]);

  async function searchUsers(q: string) {
    setQuery(q);
    if (q.trim().length < 2 || !myId) { setResults([]); return; }
    setSearching(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name")
      .ilike("full_name", `%${q}%`)
      .neq("id", myId)
      .limit(8);
    setResults((data ?? []) as ProfileLite[]);
    setSearching(false);
  }

  async function startConversation(otherId: string) {
    alert("Klikləndi: " + otherId + " | myId: " + myId);

    if (!myId || starting) return;
    setStarting(true);

    const [user_a, user_b] = [myId, otherId].sort();

    const { data: existing, error: existingError } = await supabase
      .from("conversations")
      .select("id")
      .eq("user_a", user_a)
      .eq("user_b", user_b)
      .maybeSingle();

    if (existingError) {
      alert("Axtarış xətası: " + existingError.message);
      setStarting(false);
      return;
    }

    let conversationId = existing?.id as string | undefined;

    if (!conversationId) {
      const { data: created, error } = await supabase
        .from("conversations")
        .insert({ user_a, user_b })
        .select("id")
        .single();

      if (error) {
        alert("Yaratma xətası: " + error.message);
        setStarting(false);
        return;
      }
      conversationId = created.id;
    }

    router.push(`/messages/${conversationId}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C18] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080C18] text-[#F0F4FF]  px-6">
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold">Mesajlar</h1>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#FF6B2B] px-4 py-2 text-[13px] font-bold text-white transition-all hover:-translate-y-px hover:bg-[#FF7D45]"
          >
            <Plus size={15} /> Yeni söhbət
          </button>
        </div>

        {conversations.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <MessageCircle size={40} className="mx-auto mb-3 opacity-40" />
            <p>Hələ söhbətin yoxdur. Yeni söhbət başlat.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((c) => (
              <Link
                key={c.id}
                href={`/messages/${c.id}`}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8F5C] text-[12px] font-bold text-[#0A0F1E]">
                  {c.otherName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[14.5px] truncate">{c.otherName}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-28 px-4">
          <div className="w-full max-w-[420px] rounded-xl border border-white/[0.08] bg-[#0D1220] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Space_Grotesk'] font-bold text-[15px]">Yeni söhbət</h2>
              <button onClick={() => { setShowNew(false); setQuery(""); setResults([]); }}>
                <X size={18} className="text-white/50" />
              </button>
            </div>
            <div className="relative mb-3">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => searchUsers(e.target.value)}
                placeholder="İstifadəçi adı ilə axtar..."
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.03] pl-9 pr-3 py-2.5 text-[13.5px] text-[#F0F4FF] placeholder:text-white/30 focus:outline-none focus:border-[#FF6B2B]/50"
              />
            </div>
            <div className="space-y-1 max-h-[280px] overflow-y-auto">
              {searching && <p className="text-[12px] text-white/40 px-1">Axtarılır...</p>}
              {!searching && query.trim().length >= 2 && results.length === 0 && (
                <p className="text-[12px] text-white/40 px-1">Tapılmadı.</p>
              )}
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => startConversation(r.id)}
                  disabled={starting}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13.5px] transition-colors hover:bg-white/[0.06] disabled:opacity-50"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#00D4FF] to-[#34D399] text-[10px] font-bold text-[#0A0F1E]">
                    {(r.full_name || "??").slice(0, 2).toUpperCase()}
                  </div>
                  {r.full_name || "İstifadəçi"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}