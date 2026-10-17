import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Bot,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "team", label: "Team", icon: Users },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 lg:hidden glass-panel rounded-xl p-2.5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? (
          <X size={18} className="text-[var(--color-ink)]" />
        ) : (
          <Menu size={18} className="text-[var(--color-ink)]" />
        )}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[var(--color-ink)]/25 backdrop-blur-sm z-30 lg:hidden animate-enter"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 glass-panel z-40
          flex flex-col transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:h-screen rounded-none border-y-0 border-l-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="px-6 py-5 border-b border-[var(--color-line)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center logo-spin-slow">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <span className="font-display text-[15px] font-bold text-[var(--color-ink)] tracking-tight">
                FlowMate
              </span>
              <p className="text-[10px] text-[var(--color-ink-muted)] leading-none mt-0.5 font-medium tracking-wide uppercase">
                AI Coordinator
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="text-[10px] font-semibold text-[var(--color-ink-muted)] uppercase tracking-[0.16em] px-3 mb-2">
            Navigation
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activePage === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      onNavigate(id);
                      setMobileOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-teal-500/15 to-sky-500/10 text-teal-800"
                          : "text-[var(--color-ink-soft)] hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]"
                      }
                    `}
                  >
                    <Icon
                      size={16}
                      className={`
                        transition-colors
                        ${isActive ? "text-teal-600" : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink-soft)]"}
                      `}
                    />
                    <span>{label}</span>
                    {isActive && (
                      <ChevronRight
                        size={14}
                        className="ml-auto text-teal-500"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t border-[var(--color-line)]">
          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-teal-500/8 border border-teal-500/15 rounded-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500 status-pulse" />
            </span>
            <div>
              <p className="text-xs font-semibold text-[var(--color-ink)]">
                Agent Online
              </p>
              <p className="text-[10px] text-[var(--color-ink-muted)]">n8n · AI Coordinator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
