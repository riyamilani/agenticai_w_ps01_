import { Bot, Zap, Clock } from "lucide-react";
export default function AIActivity({ activities = [] }) {
  const isOnline = true;
  const lastActivity = activities;

  return (
    <aside className="glass-panel rounded-2xl overflow-hidden animate-enter delay-3">
      <div className="relative px-5 py-4 border-b border-[var(--color-line)] shimmer">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/8 via-transparent to-sky-500/8 pointer-events-none" />
        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center logo-spin-slow">
            <Bot size={14} className="text-white" />
          </div>
          <h2 className="font-display text-sm font-bold text-[var(--color-ink)]">AI Coordinator</h2>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {isOnline && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isOnline ? "bg-teal-400 status-pulse" : "bg-slate-500"
              }`}
            />
          </span>
          <span className="text-xs font-semibold text-[var(--color-ink)]">
            Agent {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
          FlowMate monitors participant updates, identifies blockers, and keeps
          task progress synchronized.
        </p>

        <div className="border-t border-[var(--color-line)]" />

        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Zap size={12} className="text-teal-400" />
            <p className="text-[10px] font-semibold text-[var(--color-ink-muted)] uppercase tracking-[0.16em]">
              Last Activity
            </p>
          </div>

          {lastActivity.length === 0 ? (
            <p className="text-xs text-[var(--color-ink-muted)] italic">No recent activity.</p>
          ) : (
            <ul className="space-y-3">
              {lastActivity.map((activity) => (
                <li key={activity.id} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0 status-pulse" />
                    <p className="text-xs font-medium text-[var(--color-ink)] leading-snug">
                      {activity.message}
                    </p>
                  </div>
                  {activity.reason && (
                    <p className="text-[11px] text-[var(--color-ink-muted)] pl-3.5">
                      Reason:{" "}
                      <span className="text-[var(--color-ink-soft)] font-medium">
                        {activity.reason}
                      </span>
                    </p>
                  )}
                  <div className="flex items-center gap-1 pl-3.5 mt-1">
                    <Clock size={10} className="text-[var(--color-ink-muted)]/50" />
                    <span className="text-[10px] text-[var(--color-ink-muted)]/60">
                      {activity.timestamp}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gradient-to-r from-orange-500/8 to-transparent rounded-xl px-3 py-2.5 flex items-center gap-2 border border-orange-500/15">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm shadow-orange-500/30">
            <span className="text-[8px] font-bold text-white">n8</span>
          </div>
          <span className="text-[11px] text-[var(--color-ink-soft)] font-medium">
            Connected via n8n workflow
          </span>
        </div>
      </div>
    </aside>
  );
}
