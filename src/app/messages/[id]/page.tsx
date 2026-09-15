"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Send } from "lucide-react";

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export default function ConversationPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const conversationId = params.id as string;

  const [myId, setMyId] = useState<string | null>(null);
  const [otherName, setOtherName] = useState<string>("İstifadəçi");
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setMyId(user.id);

      const { data: convo } = await supabase
        .from("conversations")
        .select("user_a, user_b")
        .eq("id", conversationId)
        .single();

      if (convo) {
        const otherId = convo.user_a === user.id ? convo.user_b : convo.user_a;
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", otherId)
          .single();
        setOtherName(profile?.full_name || "İstifadəçi");
      }

      const { data: msgs } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      setMessages((msgs ?? []) as Message[]);
      setLoading(false);
    }
    load();
  }, [supabase, router, conversationId]);

  useEffect(() => {
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase, conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: messages.length <= 1 ? "auto" : "smooth" });
  }, [messages]);

  async function sendMessage() {
    const content = text.trim();
    if (!content || !myId || sending) return;
    setSending(true);
    setText("");

    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: myId,
      content,
    });

    await supabase
      .from("conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", conversationId);

    setSending(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C18] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-4rem)] bg-[#080C18] text-[#F0F4FF] flex flex-col overflow-hidden">
      <div className="border-b border-white/[0.07] px-4 py-3 flex items-center gap-3 bg-[#080C18] z-10">
        <Link href="/messages" className="text-white/50 hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8F5C] text-[11px] font-bold text-[#0A0F1E]">
          {otherName.slice(0, 2).toUpperCase()}
        </div>
        <span className="font-semibold text-[14.5px]">{otherName}</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col justify-end min-h-full px-4 py-5 max-w-[700px] w-full mx-auto space-y-2.5">
          {messages.map((m) => {
            const mine = m.sender_id === myId;
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-[13.5px] ${
                    mine
                      ? "bg-[#FF6B2B] text-white rounded-br-sm"
                      : "bg-white/[0.07] text-[#F0F4FF] rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-white/[0.07] p-3 max-w-[700px] w-full mx-auto flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          placeholder="Mesaj yaz..."
          className="flex-1 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-[13.5px] text-[#F0F4FF] placeholder:text-white/30 focus:outline-none focus:border-[#FF6B2B]/50"
        />
        <button
          onClick={sendMessage}
          disabled={sending || !text.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B2B] text-white transition-all hover:bg-[#FF7D45] disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </main>
  );
}