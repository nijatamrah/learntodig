"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Users, Plus, X, MessagesSquare } from "lucide-react";

type Room = {
  id: string;
  title: string;
  topic: string | null;
  description: string | null;
  creator_id: string;
  created_at: string;
};

export default function DebatesPage() {
  const supabase = createClient();
  const router = useRouter();

  const [myId, setMyId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  async function loadRooms() {
    const { data: roomsData } = await supabase
      .from("debate_rooms")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    const list = (roomsData ?? []) as Room[];
    setRooms(list);

    if (list.length > 0) {
      const { data: members } = await supabase
        .from("debate_members")
        .select("room_id")
        .in("room_id", list.map((r) => r.id));

      const counts: Record<string, number> = {};
      (members ?? []).forEach((m: { room_id: string }) => {
        counts[m.room_id] = (counts[m.room_id] || 0) + 1;
      });
      setMemberCounts(counts);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setMyId(user.id);
      await loadRooms();
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createRoom() {
    if (!myId || !title.trim() || creating) return;
    setCreating(true);

    const { data: room, error } = await supabase
      .from("debate_rooms")
      .insert({
        creator_id: myId,
        title: title.trim(),
        topic: topic.trim() || null,
        description: description.trim() || null,
      })
      .select("id")
      .single();

    if (error || !room) { setCreating(false); return; }

    await supabase.from("debate_members").insert({
      room_id: room.id,
      user_id: myId,
      role: "creator",
    });

    setCreating(false);
    setShowCreate(false);
    setTitle(""); setTopic(""); setDescription("");
    router.push(`/debates/${room.id}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C18] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#FF6B2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080C18] text-[#F0F4FF] pt-24 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Space_Grotesk'] text-2xl font-bold">Debat Otaqları</h1>
            <p className="text-white/40 text-[13px] mt-1">Mövzu seç, qoşul, fikrini bölüş</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#FF6B2B] px-4 py-2 text-[13px] font-bold text-white transition-all hover:-translate-y-px hover:bg-[#FF7D45]"
          >
            <Plus size={15} /> Yeni otaq
          </button>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <MessagesSquare size={40} className="mx-auto mb-3 opacity-40" />
            <p>Hələ heç bir otaq yoxdur. İlk otağı sən yarat.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {rooms.map((r) => (
              <Link
                key={r.id}
                href={`/debates/${r.id}`}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
              >
                <h3 className="font-['Space_Grotesk'] font-bold text-[15px] mb-1">{r.title}</h3>
                {r.topic && (
                  <span className="inline-block rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-[11px] font-semibold px-2.5 py-0.5 mb-2">
                    {r.topic}
                  </span>
                )}
                {r.description && (
                  <p className="text-white/50 text-[13px] line-clamp-2 mb-3">{r.description}</p>
                )}
                <div className="flex items-center gap-1.5 text-white/40 text-[12px]">
                  <Users size={13} />
                  {memberCounts[r.id] || 0} üzv
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-28 px-4">
          <div className="w-full max-w-[460px] rounded-xl border border-white/[0.08] bg-[#0D1220] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Space_Grotesk'] font-bold text-[15px]">Yeni debat otağı</h2>
              <button onClick={() => setShowCreate(false)}>
                <X size={18} className="text-white/50" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Otağın adı *"
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2.5 text-[13.5px] text-[#F0F4FF] placeholder:text-white/30 focus:outline-none focus:border-[#FF6B2B]/50"
              />
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Mövzu (məs. Geologiya)"
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2.5 text-[13.5px] text-[#F0F4FF] placeholder:text-white/30 focus:outline-none focus:border-[#FF6B2B]/50"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Qısa təsvir (istəyə bağlı)"
                rows={3}
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2.5 text-[13.5px] text-[#F0F4FF] placeholder:text-white/30 focus:outline-none focus:border-[#FF6B2B]/50 resize-none"
              />
              <button
                onClick={createRoom}
                disabled={!title.trim() || creating}
                className="w-full rounded-lg bg-[#FF6B2B] py-2.5 text-[13.5px] font-bold text-white transition-all hover:bg-[#FF7D45] disabled:opacity-40"
              >
                {creating ? "Yaradılır..." : "Otağı yarat"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
