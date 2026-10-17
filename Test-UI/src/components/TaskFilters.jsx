import { TASK_STATUSES } from "../lib/constants";

const FILTER_LABELS = {
  ALL: "All",
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  COMPLETE: "Complete",
};

export default function TaskFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {TASK_STATUSES.map((status) => {
        const isActive = activeFilter === status;
        return (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`
              relative px-3 py-1.5 rounded-md text-[11px] font-semibold
              transition-all duration-200 ease-out
              ${
                isActive
                  ? "bg-[#c48a3a] text-[#1a100a] shadow-md shadow-[#c48a3a]/20"
                  : "bg-[#2a2018] text-[#f0e6d4] hover:bg-[#3a2e22] hover:text-white border border-[#c48a3a]/20 hover:border-[#c48a3a]/40"
              }
            `}
          >
            {FILTER_LABELS[status]}
          </button>
        );
      })}
    </div>
  );
}
