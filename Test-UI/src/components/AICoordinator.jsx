import { Zap, ShieldCheck } from "lucide-react";
import { supabaseReady } from "../lib/supabase";

function formatTime(timestamp) {
  if (!timestamp) return "recently";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp;

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDays = Math.floor(diffHour / 24);
  return `${diffDays}d ago`;
}

function resolveAction(latestAction, tasks) {
  if (latestAction) return latestAction;
  if (!tasks || tasks.length === 0) return null;

  // Prioritize active in-progress or blocked task from latest updates
  const sorted = [...tasks].sort((a, b) => {
    // If one is IN_PROGRESS and recently touched, prioritize active work
    const timeA = new Date(a.updated_at || 0).getTime();
    const timeB = new Date(b.updated_at || 0).getTime();
    return timeB - timeA;
  });

  const active = sorted.find((t) => t.status === "IN_PROGRESS") || sorted[0];
  if (!active) return null;

  const isBlocked = active.status === "BLOCKED";
  const isInProgress = active.status === "IN_PROGRESS";
  const isComplete = active.status === "COMPLETE";

  let label = "Status Updated";
  if (isBlocked) label = "Marked Blocked";
  else if (isInProgress) label = "Marked In Progress";
  else if (isComplete) label = "Marked Complete";
  else if (active.status === "PENDING") label = "Marked Pending";

  let detail = active.blocker;
  if (isInProgress) {
    detail = `Active · Assigned to ${active.owner_name || "team member"}`;
  } else if (isComplete) {
    detail = `Completed by ${active.owner_name || "team member"}`;
  } else if (!detail && active.owner_name) {
    detail = `Assigned to ${active.owner_name}`;
  }

  return {
    taskId: active.id,
    taskTitle: active.title,
    status: active.status,
    label,
    detail,
    updated_at: active.updated_at,
  };
}

const statusStyles = {
  BLOCKED: {
    accentBar: "bg-[#c45c4a]",
    badgeBg: "bg-[#c45c4a]/15 text-[#f0a090] border-[#c45c4a]/30",
    detailLabel: "Reason",
  },
  IN_PROGRESS: {
    accentBar: "bg-[#c48a3a]",
    badgeBg: "bg-[#c48a3a]/15 text-[#e8c48a] border-[#c48a3a]/30",
    detailLabel: "Status",
  },
  COMPLETE: {
    accentBar: "bg-[#6b8f4e]",
    badgeBg: "bg-[#6b8f4e]/15 text-[#c8d4a8] border-[#6b8f4e]/30",
    detailLabel: "Status",
  },
  PENDING: {
    accentBar: "bg-[#92793a]",
    badgeBg: "bg-amber-500/15 text-amber-200 border-amber-500/30",
    detailLabel: "Status",
  },
};

export default function AICoordinator({ tasks = [], latestAction = null }) {
  const isOnline = supabaseReady;
  const list = Array.isArray(tasks) ? tasks : [];
  const action = resolveAction(latestAction, list);
  const style = statusStyles[action?.status] || statusStyles.IN_PROGRESS;

  return (
    <section className="glass-panel rounded-xl overflow-hidden animate-enter delay-3 h-fit">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-[var(--color-line)] flex items-center justify-between">
        <span className="font-display text-[13px] font-bold text-[#c48a3a] tracking-[0.2em] uppercase">
          AI Coordinator
        </span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            {isOnline && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8faf6a] opacity-60" />
            )}
            <span
              className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                isOnline ? "bg-[#8faf6a]" : "bg-[#5a4a3a]"
              }`}
            />
          </span>
          <span
            className={`text-[10px] font-semibold tracking-wide uppercase ${
              isOnline ? "text-[#b0d090]" : "text-[#6a5a4a]"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Description */}
        <p className="text-[12px] text-[#a08868] leading-relaxed">
          FlowMate monitors updates, identifies blockers, and keeps tasks synchronized across the team.
        </p>

        {/* Latest AI action */}
        {action ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Zap size={10} className="text-[#c48a3a]" />
              <span className="text-[10px] font-bold text-[#6a5840] uppercase tracking-[0.18em]">
                Latest AI Action
              </span>
            </div>

            <div className="relative bg-[#1a1208]/80 border border-[var(--color-line)] rounded-lg px-4 py-3 space-y-2 overflow-hidden">
              {/* Left accent bar — dynamically colored by status */}
              <div
                className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${style.accentBar}`}
              />

              {/* Task title */}
              <p className="text-[12px] font-semibold text-white pl-1 leading-snug">
                {action.taskTitle}
              </p>

              {/* Status action badge */}
              <div className="flex items-center gap-2 pl-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border tracking-wide uppercase ${style.badgeBg}`}
                >
                  {action.label}
                </span>
              </div>

              {/* Detail / Reason */}
              {action.detail && (
                <p className="text-[11px] text-[#a08060] pl-1">
                  {style.detailLabel}:{" "}
                  <span className="text-[#d4b890] font-medium">
                    {action.detail}
                  </span>
                </p>
              )}

              {/* Timestamp */}
              <p className="text-[10px] text-[#6a5040] pl-1">
                {formatTime(action.updated_at)}
              </p>
            </div>
          </div>
        ) : list.length > 0 ? (
          <div className="p-3 rounded-lg bg-[#141810]/60 border border-[#8faf6a]/20 flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-[#8faf6a] flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold text-[#c8d4a8]">All Systems Clear</p>
              <p className="text-[10px] text-[#8a9870]">
                No active blockers detected across {list.length} task{list.length !== 1 ? "s" : ""}.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-[#6a5840] italic">
            FlowMate is actively monitoring. No tasks logged yet.
          </p>
        )}
      </div>
    </section>
  );
}
