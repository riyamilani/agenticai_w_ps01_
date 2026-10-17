function getStats(tasks = []) {
  const list = Array.isArray(tasks) ? tasks : [];
  return {
    total: list.length,
    pending: list.filter((t) => t.status === "PENDING").length,
    inProgress: list.filter((t) => t.status === "IN_PROGRESS").length,
    blocked: list.filter((t) => t.status === "BLOCKED").length,
    complete: list.filter((t) => t.status === "COMPLETE").length,
  };
}

const statConfig = [
  {
    key: "pending",
    label: "Pending",
    dot: "bg-amber-400",
    text: "text-amber-200",
  },
  {
    key: "inProgress",
    label: "In Progress",
    dot: "bg-[#d4a05a]",
    text: "text-[#e8c48a]",
  },
  {
    key: "blocked",
    label: "Blocked",
    dot: "bg-[#d47060]",
    text: "text-[#f0a090]",
  },
  {
    key: "complete",
    label: "Complete",
    dot: "bg-[#8faf6a]",
    text: "text-[#c8d4a8]",
  },
];

export default function ProjectStatus({ tasks = [] }) {
  const stats = getStats(tasks);

  return (
    <section className="glass-panel rounded-xl px-6 py-4 animate-enter delay-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Label */}
        <div className="flex items-center gap-3">
          <span className="font-display text-[13px] font-bold text-[#c48a3a] tracking-[0.2em] uppercase leading-none flex-shrink-0">
            Project Status
          </span>
        </div>

        {/* Numbers as per Supabase */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {statConfig.map(({ key, label, dot, text }, idx) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
              <span className="text-[12px] text-[#a08868]">
                {label} :{" "}
                <span className={`font-bold tabular-nums ${text}`}>
                  {stats[key]}
                </span>
              </span>
              {idx < statConfig.length - 1 && (
                <span className="text-[#3a2e22] text-[12px] ml-1">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
