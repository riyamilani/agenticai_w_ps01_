export const TASK_STATUSES = ["ALL", "PENDING", "IN_PROGRESS", "BLOCKED", "COMPLETE"];

export const STATUS_META = {
  PENDING: {
    label: "Pending",
    color: "text-amber-200",
    bg: "bg-amber-600/20",
    border: "border-amber-500/35",
    dot: "bg-amber-400",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "text-[#e8c48a]",
    bg: "bg-[#c48a3a]/20",
    border: "border-[#c48a3a]/40",
    dot: "bg-[#d4a05a]",
  },
  BLOCKED: {
    label: "Blocked",
    color: "text-[#f0a090]",
    bg: "bg-[#c45c4a]/20",
    border: "border-[#c45c4a]/40",
    dot: "bg-[#d47060]",
  },
  COMPLETE: {
    label: "Complete",
    color: "text-[#c8d4a8]",
    bg: "bg-[#6b8f4e]/20",
    border: "border-[#6b8f4e]/40",
    dot: "bg-[#8faf6a]",
  },
};
