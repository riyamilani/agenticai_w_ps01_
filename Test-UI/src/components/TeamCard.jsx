export default function TeamCard({ member }) {
  const { name, role, status, avatar } = member;
  const isActive = status === "Active";

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-400/5 transition-colors duration-200">
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-sm">
          <span className="text-sm font-bold text-white">{avatar ?? name?.[0]?.toUpperCase()}</span>
        </div>
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0c1520] ${
            isActive ? "bg-teal-400 status-pulse" : "bg-slate-500"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--color-ink)] truncate">{name}</p>
        <p className="text-xs text-[var(--color-ink-muted)]">{role}</p>
      </div>

      <span
        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg ${
          isActive
            ? "bg-teal-400/10 text-teal-300 border border-teal-400/25"
            : "bg-white/[0.04] text-[var(--color-ink-muted)]"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
