import { ListChecks } from "lucide-react";

import Header from "../components/Header";
import ProjectStatus from "../components/ProjectStatus";
import TeamSection from "../components/TeamSection";
import TaskRow from "../components/TaskRow";
import AICoordinator from "../components/AICoordinator";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTasks } from "../hooks/useTasks";

export default function CommandCenter() {
  const { tasks, loading, error, latestAction } = useTasks();

  return (
    <div className="app-shell flex flex-col">
      <AnimatedBackground />
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full max-w-6xl mx-auto space-y-5">

          {/* Project Progress */}
          <ProjectStatus tasks={tasks} />

          {/* Team */}
          <TeamSection />

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-5">

            {/* Left: Current Tasks */}
            <div className="flex-1 min-w-0 animate-enter delay-2">
              <section className="glass-panel rounded-xl overflow-hidden">
                {/* Section header */}
                <div className="px-5 py-3.5 border-b border-[var(--color-line)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ListChecks size={13} className="text-[#c48a3a]" />
                    <span className="font-display text-[13px] font-bold text-[#c48a3a] tracking-[0.2em] uppercase">
                      Current Tasks
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6a5840]">
                    {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Task list */}
                <div className="p-3 space-y-2">
                  {loading ? (
                    <div className="flex items-center justify-center py-10">
                      <span className="text-[12px] text-[#8a7060] italic">
                        Loading tasks from Supabase…
                      </span>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <p className="text-[12px] font-semibold text-[#c45c4a]">
                        Could not load tasks
                      </p>
                      <p className="text-[11px] text-[#8a6050] mt-1">{error}</p>
                    </div>
                  ) : tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <p className="text-[12px] font-semibold text-[#8a7060]">No tasks yet</p>
                      <p className="text-[11px] text-[#6a5040] mt-1">
                        Tasks will appear here once added in Supabase.
                      </p>
                    </div>
                  ) : (
                    tasks.map((task, i) => (
                      <div
                        key={task.id}
                        className="animate-enter"
                        style={{ animationDelay: `${0.28 + i * 0.08}s` }}
                      >
                        <TaskRow task={task} />
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* Right: AI Coordinator */}
            <div className="lg:w-72 xl:w-80 flex-shrink-0">
              <AICoordinator tasks={tasks} latestAction={latestAction} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
