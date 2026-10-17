import { useState, useMemo } from "react";
import {
  ListChecks,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  SearchX,
  ClipboardList,
  UserX,
} from "lucide-react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard";
import TeamCard from "../components/TeamCard";
import AIActivity from "../components/AIActivity";
import AnimatedBackground from "../components/AnimatedBackground";
const mockTasks = [];
const mockUsers = [];

function getStats(tasks) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const blocked = tasks.filter((t) => t.status === "BLOCKED").length;
  return { total, pending, inProgress, blocked };
}

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => getStats(mockTasks), []);

  const filteredTasks = useMemo(() => {
    let tasks = mockTasks;

    if (activeFilter !== "ALL") {
      tasks = tasks.filter((t) => t.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.owner_name.toLowerCase().includes(q)
      );
    }

    return tasks;
  }, [activeFilter, searchQuery]);

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total,
      supportingText: "Across all statuses",
      icon: ListChecks,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-500/10 border border-sky-500/20",
    },
    {
      label: "Pending",
      value: stats.pending,
      supportingText: "Awaiting start",
      icon: Clock,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-500/10 border border-amber-500/20",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      supportingText: "Currently active",
      icon: CheckCircle2,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-500/10 border border-sky-500/20",
    },
    {
      label: "Blocked",
      value: stats.blocked,
      supportingText: "Needs attention",
      icon: AlertTriangle,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-500/10 border border-rose-500/20",
    },
  ];

  return (
    <div className="app-shell flex flex-col">
      <AnimatedBackground />

      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-screen-xl mx-auto">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card, i) => (
              <div key={card.label} style={{ animationDelay: `${0.06 * (i + 1)}s` }}>
                <StatCard {...card} />
              </div>
            ))}
          </section>

          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0 space-y-6">
              <section className="glass-panel rounded-2xl animate-enter delay-2">
                <div className="px-5 py-4 border-b border-[var(--color-line)]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <ListChecks size={16} className="text-sky-600" />
                      </div>
                      <div>
                        <h2 className="font-display text-sm font-bold text-[var(--color-ink)]">
                          Project Tasks
                        </h2>
                        <p className="text-xs text-[var(--color-ink-muted)]">
                          Track progress and blockers across the team
                        </p>
                      </div>
                    </div>
                    <TaskFilters
                      activeFilter={activeFilter}
                      onFilterChange={setActiveFilter}
                    />
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {filteredTasks.length === 0 ? (
                    <EmptyState
                      icon={
                        searchQuery
                          ? SearchX
                          : activeFilter !== "ALL"
                          ? ClipboardList
                          : ClipboardList
                      }
                      title={
                        searchQuery
                          ? "No tasks match your search"
                          : activeFilter !== "ALL"
                          ? `No ${activeFilter.replace("_", " ").toLowerCase()} tasks`
                          : "No tasks yet"
                      }
                      description={
                        searchQuery
                          ? `Try a different search term.`
                          : "Tasks assigned to the team will appear here."
                      }
                    />
                  ) : (
                    filteredTasks.map((task, i) => (
                      <div
                        key={task.id}
                        className="animate-enter"
                        style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                      >
                        <TaskCard task={task} />
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="glass-panel rounded-2xl animate-enter delay-3">
                <div className="px-5 py-4 border-b border-[var(--color-line)] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <Users size={15} className="text-teal-600" />
                  </div>
                  <div>
                    <h2 className="font-display text-sm font-bold text-[var(--color-ink)]">
                      Project Team
                    </h2>
                    <p className="text-xs text-[var(--color-ink-muted)]">
                      Active participants in this workspace
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3">
                  {mockUsers.length === 0 ? (
                    <EmptyState
                      icon={UserX}
                      title="No team members"
                      description="Add participants to start coordinating."
                    />
                  ) : (
                    mockUsers.map((member) => (
                      <TeamCard key={member.id} member={member} />
                    ))
                  )}
                </div>
              </section>
            </div>

            <div className="xl:w-72 flex-shrink-0">
              <AIActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[var(--color-ink)]/5 border border-[var(--color-line)] flex items-center justify-center mb-3">
        <Icon size={22} className="text-[var(--color-ink-muted)]" />
      </div>
      <p className="text-sm font-semibold text-[var(--color-ink-soft)]">{title}</p>
      <p className="text-xs text-[var(--color-ink-muted)] mt-1 max-w-xs">{description}</p>
    </div>
  );
}
