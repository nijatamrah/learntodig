"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Send, Users } from "lucide-react";

type Room = {
  id: string;
  title: string;
  topic: string | null;
  description: string | null;
  creator_id: string;
};

type Message = {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

type ProfileLite = { id: string; full_name: string | null };

export default function DebateRoomPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const roomId = params.id as string;

  const [myId, setMyId] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [joining, setJoining] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [namesById, setNamesById] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function loadNames(userIds: string[]) {
    const unique = Array.from(new Set(userIds));
    if (unique.length === 0) return;
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", unique);
    setNamesById((prev) => {
      const next = { ...prev };
      (data ?? []).forEach((p: ProfileLite) => { next[p.id] = p.full_name || "İstifadəçi"; });
      return next;
    });
  }

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setMyId(user.id);

      const { data: roomData } = await supabase
        .from("debate_rooms")
        .select("*")
        .eq("id", roomId)
        .single();
      setRoom(roomData as Room);

      const { data: members } = await supabase
        .from("debate_members")
        .select("user_id")
        .eq("room_id", roomId);

      const memberIds = (members ?? []).map((m: { user_id: string }) => m.user_id);
      setMemberCount(memberIds.length);
      setIsMember(memberIds.includes(user.id));

      if (memberIds.includes(user.id)) {
        const { data: msgs } = await supabase
          .from("debate_messages")
          .select("*")
          .eq("room_id", roomId)
          .order("created_at", { ascending: true });

        const msgList = (msgs ?? []) as Message[];
        setMessages(msgList);
        await loadNames(msgList.map((m) => m.user_id));
      }

      setLoading(false);
    }
    load();
  }, [supabase, router, roomId]);

  useEffect(() => {
    if (!isMember) return;
    const channel = supabase
      .channel(`debate-${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "debate_messages", filter: `room_id=eq.${roomId}` },
        async (payload) => {
          const msg = payload.new as Message;
          setMessages((prev) => [...prev, msg]);
          await loadNames([msg.user_id]);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMember, roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function joinRoom() {
    if (!myId || joining) return;
    setJoining(true);

    const { error } = await supabase.from("debate_members").insert({
      room_id: roomId,
      user_id: myId,
      role: "member",
    });

    if (!error) {
      setIsMember(true);
      setMemberCount((c) => c + 1);
      const { data: msgs } = await supabase
        .from("debate_messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });
      const msgList = (msgs ?? []) as Message[];
      setMessages(msgList);
      await loadNames(msgList.map((m) => m.user_id));
    }
    setJoining(false);
  }

  async function sendMessage() {
    const content = text.trim();
    if (!content || !myId || sending) return;
    setSending(true);
    setText("");
    await supabase.from("debate_messages").insert({
      room_id: roomId,
      user_id: myId,
      content,
    });
    setSending(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C18] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#080C18] flex items-center justify-center text-white/50">
        Otaq tapılmadı.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080C18] text-[#F0F4FF] flex flex-col pt-16">
      <div className="border-b border-white/[0.07] px-4 py-3 flex items-center gap-3 sticky top-16 bg-[#080C18] z-10">
        <Link href="/debates" className="text-white/50 hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="font-['Space_Grotesk'] font-bold text-[14.5px] truncate">{room.title}</p>
          {room.topic && <p className="text-[11.5px] text-[#00D4FF]">{room.topic}</p>}
        </div>
        <div className="flex items-center gap-1.5 text-white/40 text-[12px]">
          <Users size={13} /> {memberCount}
        </div>
      </div>

      {!isMember ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {room.description && (
            <p className="text-white/50 text-[14px] max-w-[420px] mb-5">{room.description}</p>
          )}
          <button
            onClick={joinRoom}
            disabled={joining}
            className="rounded-lg bg-[#FF6B2B] px-6 py-2.5 text-[13.5px] font-bold text-white transition-all hover:bg-[#FF7D45] disabled:opacity-50"
          >
            {joining ? "Qoşulur..." : "Otağa qoşul"}
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-5 max-w-[700px] w-full mx-auto space-y-3">
            {messages.map((m) => {
              const mine = m.user_id === myId;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                    {!mine && (
                      <span className="text-[11px] text-white/40 mb-0.5 px-1">
                        {namesById[m.user_id] || "İstifadəçi"}
                      </span>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2 text-[13.5px] ${
                        mine
                          ? "bg-[#FF6B2B] text-white rounded-br-sm"
                          : "bg-white/[0.07] text-[#F0F4FF] rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-white/[0.07] p-3 max-w-[700px] w-full mx-auto flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Fikrini yaz..."
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
        </>
      )}
    </main>
  );
}
