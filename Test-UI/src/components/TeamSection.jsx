import { useEffect, useState } from "react";
import { supabase, supabaseReady } from "../lib/supabase";

/**
 * Fetches users from Supabase (id, name, role only — no private fields).
 * - role === "PROJECT_COORDINATOR" → shown as coordinator
 * - all others → team member list
 * Renders a "not configured" hint if Supabase credentials aren't set yet.
 */
export default function TeamSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(supabaseReady);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabaseReady) return;

    let cancelled = false;

    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("id, name, role")
        .order("name", { ascending: true });

      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else {
        setUsers(data ?? []);
      }
      setLoading(false);
    }

    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const coordinator = users.find((u) => u.role === "PROJECT_COORDINATOR");
  const members = users.filter((u) => u.role !== "PROJECT_COORDINATOR");

  return (
    <section className="glass-panel rounded-xl px-6 py-4 animate-enter delay-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        {/* Left: Team label + member names */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-display text-[13px] font-bold text-[#c48a3a] tracking-[0.2em] uppercase leading-none flex-shrink-0">
            Team
          </span>

          {!supabaseReady ? (
            <span className="text-[11px] text-[#6a5840] italic">
              Add Supabase credentials to .env.local
            </span>
          ) : loading ? (
            <span className="text-[12px] text-[#6a5840] italic">Loading…</span>
          ) : error ? (
            <span className="text-[11px] text-[#c45c4a]">Could not load team</span>
          ) : users.length === 0 ? (
            <span className="text-[12px] text-[#6a5840] italic">No members yet</span>
          ) : (
            <div className="flex items-center gap-1.5 flex-wrap">
              {members.map((u, i) => (
                <span key={u.id} className="flex items-center gap-1.5">
                  <MemberChip name={u.name} />
                  {i < members.length - 1 && (
                    <span className="text-[#3a2e22] text-[12px]">·</span>
                  )}
                </span>
              ))}
              {members.length === 0 && coordinator && (
                <MemberChip name={coordinator.name} />
              )}
            </div>
          )}
        </div>

        {/* Right: Coordinator */}
        {supabaseReady && !loading && !error && coordinator && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] text-[#6a5840] uppercase tracking-[0.16em] font-semibold">
              Coordinator
            </span>
            <span className="text-[#4a3828]">·</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-sm bg-[#c48a3a]/25 border border-[#c48a3a]/35 flex items-center justify-center flex-shrink-0">
                <span className="text-[7px] font-bold text-[#e8c48a]">
                  {coordinator.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#d4b890]">
                {coordinator.name}
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function MemberChip({ name }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-4 h-4 rounded-sm bg-[#2a2018] border border-[rgba(196,138,58,0.2)] flex items-center justify-center flex-shrink-0">
        <span className="text-[7px] font-bold text-[#c48a3a]">
          {name?.[0]?.toUpperCase()}
        </span>
      </div>
      <span className="text-[12px] text-[#b09878] font-medium">{name}</span>
    </div>
  );
}
