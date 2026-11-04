import React, { useEffect, useState } from "react";

interface CourseTask {
  id: string;
  courseCode: string;
  title: string;
  dueLabel: string;
  completed: boolean;
}

const INITIAL_TASKS: CourseTask[] = [
  {
    id: "t1",
    courseCode: "BUS 401",
    title: "Strategic Management Case Analysis Brief",
    dueLabel: "Today • 5:00 PM",
    completed: true,
  },
  {
    id: "t2",
    courseCode: "BUS 412",
    title: "Quantitative Operations Research Problem Set",
    dueLabel: "Tomorrow • 11:00 AM",
    completed: false,
  },
  {
    id: "t3",
    courseCode: "DEV LAB",
    title: "Refactor React Dashboard State & Tailwind Tokens",
    dueLabel: "Thu • 3:00 PM",
    completed: false,
  },
  {
    id: "t4",
    courseCode: "BUS 418",
    title: "Organizational Behavior Seminar Presentation",
    dueLabel: "Fri • 1:00 PM",
    completed: false,
  },
];

const PRESETS = [
  { label: "Pomodoro (25m)", seconds: 25 * 60 },
  { label: "Short Break (5m)", seconds: 5 * 60 },
  { label: "Deep Sprint (45m)", seconds: 45 * 60 },
];

export const ProductivityDemo: React.FC = () => {
  const [tasks, setTasks] = useState<CourseTask[]>(INITIAL_TASKS);
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeCourse, setActiveCourse] = useState("BUS 401 • Strategic Management");
  const [newCourseCode, setNewCourseCode] = useState("BUS 405");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  const selectPreset = (idx: number) => {
    setActivePresetIdx(idx);
    setIsRunning(false);
    setSecondsLeft(PRESETS[idx].seconds);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const remainingCount = tasks.length - completedCount;
  const progressPercent = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const item: CourseTask = {
      id: `t-${Date.now()}`,
      courseCode: newCourseCode.trim().toUpperCase() || "COURSE",
      title: newTaskTitle.trim(),
      dueLabel: "This Week",
      completed: false,
    };
    setTasks((prev) => [item, ...prev]);
    setNewTaskTitle("");
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-space-md lg:p-space-xl shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">timer</span>
          </div>
          <div>
            <div className="font-mono text-[11px] font-bold text-primary uppercase">
              v1.2.0 • ACADEMIC TOOL SANDBOX
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Pomodoro &amp; Semester Milestone Tracker
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => selectPreset(idx)}
              className={`px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activePresetIdx === idx
                  ? "bg-primary-container text-on-primary shadow-sm"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left: Pomodoro Study Cycle */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              Active Study Cycle
            </span>
            <span className="px-2.5 py-0.5 rounded bg-primary-fixed text-primary font-mono text-[11px] font-bold">
              {isRunning ? "RUNNING" : "READY"}
            </span>
          </div>

          <select
            value={activeCourse}
            onChange={(e) => setActiveCourse(e.target.value)}
            aria-label="Select active study course"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
          >
            <option value="BUS 401 • Strategic Management">BUS 401 • Strategic Management</option>
            <option value="BUS 412 • Operations Research">BUS 412 • Operations Research</option>
            <option value="DEV LAB • React & UI Architecture">
              DEV LAB • React &amp; UI Architecture
            </option>
            <option value="BUS 418 • Organizational Behavior">
              BUS 418 • Organizational Behavior
            </option>
          </select>

          <div className="bg-surface-container-low rounded-xl py-8 px-4 text-center">
            <div className="font-mono text-5xl sm:text-6xl font-bold text-on-surface tracking-tight tabular-nums">
              {formatTime(secondsLeft)}
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
              {activeCourse}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isRunning ? "pause" : "play_arrow"}
              </span>
              <span>{isRunning ? "Pause Cycle" : "Start Study Cycle"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(PRESETS[activePresetIdx].seconds);
              }}
              className="py-3 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right: Milestone & Deadline Checklist */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Semester Milestones
              </span>
              <span className="font-mono text-xs text-primary font-bold tabular-nums">
                {remainingCount} pending • {progressPercent}% complete
              </span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary-container h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={newCourseCode}
              onChange={(e) => setNewCourseCode(e.target.value)}
              placeholder="BUS 405"
              maxLength={10}
              aria-label="Course code"
              className="sm:w-28 px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-mono text-xs outline-none focus:ring-2 focus:ring-primary-container"
            />
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add assignment or project deadline..."
              aria-label="Task title"
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-primary-fixed hover:bg-primary-container text-primary hover:text-on-primary font-label-md text-label-md transition-colors cursor-pointer whitespace-nowrap"
            >
              + Add Milestone
            </button>
          </form>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() =>
                  setTasks((prev) =>
                    prev.map((item) =>
                      item.id === task.id ? { ...item, completed: !item.completed } : item
                    )
                  )
                }
                className="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 ${
                      task.completed ? "text-primary-container" : "text-outline"
                    }`}
                  >
                    {task.completed ? "check_circle" : "radio_button_unchecked"}
                  </span>
                  <div className="min-w-0">
                    <div
                      className={`font-body-sm text-body-sm font-medium truncate ${
                        task.completed ? "line-through text-outline" : "text-on-surface"
                      }`}
                    >
                      {task.title}
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      {task.courseCode} • {task.dueLabel}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Delete task"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTasks((prev) => prev.filter((item) => item.id !== task.id));
                  }}
                  className="text-outline hover:text-error transition-colors p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
