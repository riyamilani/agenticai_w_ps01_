import { Clock, AlertTriangle } from "lucide-react";
import { STATUS_META } from "../lib/constants";

export default function TaskCard({ task }) {
  const { title, description, owner_name, status, blocker, updated_at } = task;
  const meta = STATUS_META[status] ?? STATUS_META["PENDING"];
  const isBlocked = status === "BLOCKED";

  return (
    <article
      className={`
        glass-panel rounded-2xl p-5 hover-lift
        ${isBlocked ? "border-rose-500/25" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-ink)] truncate">
            {title}
          </h3>
          <p className="text-xs text-[var(--color-ink-muted)] mt-0.5 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <span
          className={`
            flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold
            border ${meta.bg} ${meta.color} ${meta.border}
          `}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
          {meta.label}
        </span>
      </div>

      {isBlocked && blocker && (
        <div className="flex items-start gap-2 bg-rose-500/8 border border-rose-500/15 rounded-xl px-3 py-2 mb-3">
          <AlertTriangle
            size={13}
            className="text-rose-500 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-[11px] font-semibold text-rose-300 uppercase tracking-wide">
              Blocker
            </p>
            <p className="text-xs text-rose-300/80 mt-0.5">{blocker}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 mt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">
              {owner_name?.[0]?.toUpperCase() ?? "?"}
            </span>
          </div>
          <span className="text-xs text-[var(--color-ink-soft)] font-medium">{owner_name}</span>
        </div>

        <div className="flex items-center gap-1 text-[var(--color-ink-muted)]">
          <Clock size={11} />
          <span className="text-[11px]">{updated_at}</span>
        </div>
      </div>
    </article>
  );
}
