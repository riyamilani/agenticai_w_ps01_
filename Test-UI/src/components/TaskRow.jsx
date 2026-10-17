import { AlertTriangle } from "lucide-react";
import { STATUS_META } from "../lib/constants";

function formatTime(timestamp) {
  if (!timestamp) return "recently";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp; // If already a string like "2 minutes ago"

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

export default function TaskRow({ task }) {
  const { title, description, owner_name, status, blocker, updated_at } = task;
  const meta = STATUS_META[status] ?? STATUS_META["PENDING"];
  const isBlocked = status === "BLOCKED";
  const isInProgress = status === "IN_PROGRESS";
  const timeText = formatTime(updated_at);

  return (
    <article
      className={`
        group px-4 py-3.5 rounded-lg border transition-colors duration-200
        ${
          isBlocked
            ? "bg-[#221410]/80 border-[#c45c4a]/30 hover:border-[#c45c4a]/50"
            : "bg-[#1a1410]/60 border-[rgba(232,196,138,0.12)] hover:border-[rgba(232,196,138,0.25)]"
        }
      `}
    >
      {/* Top row: title + status badge */}
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h3 className="text-[13px] font-semibold text-white leading-snug group-hover:text-[#e8c48a] transition-colors">
          {title}
        </h3>
        <span
          className={`
            inline-flex flex-shrink-0 items-center gap-1 text-[10px] font-bold
            px-2 py-0.5 rounded border tracking-wide uppercase
            ${meta.bg} ${meta.color} ${meta.border}
          `}
        >
          <span
            className={`w-1 h-1 rounded-full ${meta.dot} ${
              isBlocked || isInProgress ? "status-pulse" : ""
            }`}
          />
          {meta.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-[12px] text-[#c0a880] leading-relaxed mb-2.5">
        {description}
      </p>

      {/* Footer row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Owner */}
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-sm bg-[#c48a3a]/30 border border-[#c48a3a]/40 flex items-center justify-center">
            <span className="text-[7px] font-bold text-[#e8c48a]">
              {owner_name?.[0]?.toUpperCase() ?? "?"}
            </span>
          </div>
          <span className="text-[11px] text-[#a89070] font-medium">{owner_name}</span>
        </div>

        {/* Separator */}
        <span className="text-[#4a3828]">·</span>

        {/* Blocker or timestamp */}
        {isBlocked && blocker ? (
          <div className="flex items-center gap-1">
            <AlertTriangle size={10} className="text-[#d47060] flex-shrink-0" />
            <span className="text-[11px] text-[#f0a090] font-medium">
              {blocker}
            </span>
          </div>
        ) : (
          <span className="text-[11px] text-[#6a5540]">Updated {timeText}</span>
        )}
      </div>
    </article>
  );
}
