import { useState, useEffect, useCallback, useRef } from "react";
import { supabase, supabaseReady } from "../lib/supabase";

function buildAction(task, previousStatus = null) {
  if (!task) return null;
  const isBlocked = task.status === "BLOCKED";
  const isInProgress = task.status === "IN_PROGRESS";
  const isComplete = task.status === "COMPLETE";

  let label = "Status Updated";
  if (isBlocked) label = "Marked Blocked";
  else if (isInProgress) label = "Marked In Progress";
  else if (isComplete) label = "Marked Complete";
  else if (task.status === "PENDING") label = "Marked Pending";

  let detail = null;
  if (isBlocked && task.blocker) {
    detail = task.blocker;
  } else if (isInProgress) {
    detail = `Active · Assigned to ${task.owner_name || "team member"}`;
  } else if (isComplete) {
    detail = `Completed by ${task.owner_name || "team member"}`;
  } else if (task.owner_name) {
    detail = `Assigned to ${task.owner_name}`;
  }

  return {
    id: `act-${task.id}`,
    taskId: task.id,
    taskTitle: task.title,
    status: task.status,
    previousStatus,
    label,
    detail,
    updated_at: new Date().toISOString(),
  };
}

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(supabaseReady);
  const [error, setError] = useState(null);
  const [latestAction, setLatestAction] = useState(() => {
    try {
      const saved = localStorage.getItem("flowmate_latest_ai_action");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const prevTasksRef = useRef(null);

  const fetchTasks = useCallback(async () => {
    if (!supabaseReady || !supabase) return;

    try {
      // 1. Explicitly select requested task columns only
      const { data: rawTasks, error: taskError } = await supabase
        .from("tasks")
        .select("id, title, description, owner_id, status, blocker, updated_at")
        .order("updated_at", { ascending: false });

      if (taskError) {
        setError(taskError.message);
        return;
      }

      // 2. Explicitly select requested user columns only (never select telegram_chat_id)
      const { data: usersData } = await supabase
        .from("users")
        .select("id, name, role");

      const userMap = new Map((usersData || []).map((u) => [u.id, u.name]));

      const formatted = (rawTasks || []).map((t) => ({
        ...t,
        owner_name: userMap.get(t.owner_id) || "Unassigned",
      }));

      // Check for live updates/changes compared to previous fetch
      if (prevTasksRef.current && prevTasksRef.current.length > 0) {
        const prevMap = new Map(prevTasksRef.current.map((t) => [t.id, t]));

        for (const curr of formatted) {
          const prev = prevMap.get(curr.id);
          if (!prev) {
            // New task was added
            const act = buildAction(curr);
            setLatestAction(act);
            try {
              localStorage.setItem("flowmate_latest_ai_action", JSON.stringify(act));
            } catch {}
            break;
          } else if (prev.status !== curr.status || prev.blocker !== curr.blocker) {
            // Task status or blocker changed in Supabase!
            const act = buildAction(curr, prev.status);
            setLatestAction(act);
            try {
              localStorage.setItem("flowmate_latest_ai_action", JSON.stringify(act));
            } catch {}
            break;
          }
        }
      }

      prevTasksRef.current = formatted;
      setTasks(formatted);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabaseReady || !supabase) {
      setLoading(false);
      return;
    }

    fetchTasks();

    // Listen to real-time postgres changes on tasks table
    let channel = null;
    try {
      channel = supabase
        .channel("tasks-live-sync")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "tasks" },
          () => {
            fetchTasks();
          }
        )
        .subscribe();
    } catch (e) {
      console.warn("Realtime error:", e);
    }

    // Polling interval (2.5s) to guarantee updates reflect immediately even without socket triggers
    const interval = setInterval(fetchTasks, 2500);

    return () => {
      clearInterval(interval);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [fetchTasks]);

  return { tasks, loading, error, latestAction, refetch: fetchTasks };
}
