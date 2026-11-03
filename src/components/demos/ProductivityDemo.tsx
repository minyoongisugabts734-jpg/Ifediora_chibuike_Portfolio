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
    courseCode: "CMP 312",
    title: "Implement Dijkstra Shortest-Path Lab Report",
    dueLabel: "Today · 5:00 PM",
    completed: true,
  },
  {
    id: "t2",
    courseCode: "CMP 304",
    title: "Relational Schema Normalization Exercise (3NF)",
    dueLabel: "Tomorrow · 11:00 AM",
    completed: false,
  },
  {
    id: "t3",
    courseCode: "MTH 301",
    title: "Discrete Graph Coloring Problem Set",
    dueLabel: "Thu · 2:00 PM",
    completed: false,
  },
  {
    id: "t4",
    courseCode: "CMP 318",
    title: "UI Wireframe Prototype Review on Figma",
    dueLabel: "Fri · 4:00 PM",
    completed: false,
  },
];

const PRESETS = [
  { label: "Pomodoro Focus", seconds: 25 * 60 },
  { label: "Short Break", seconds: 5 * 60 },
  { label: "Exam Sprint", seconds: 45 * 60 },
];

export const ProductivityDemo: React.FC = () => {
  const [tasks, setTasks] = useState<CourseTask[]>(INITIAL_TASKS);
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(24 * 60 + 15);
  const [isRunning, setIsRunning] = useState(false);
  const [activeCourse, setActiveCourse] = useState("CMP 312: Algorithms");
  const [newCourseCode, setNewCourseCode] = useState("CMP 322");
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
      courseCode: newCourseCode.trim().toUpperCase() || "CMP 300",
      title: newTaskTitle.trim(),
      dueLabel: "This Week",
      completed: false,
    };
    setTasks((prev) => [item, ...prev]);
    setNewTaskTitle("");
  };

  return (
    <div className="bg-surface-container-low rounded-3xl p-6 lg:p-8 shadow-xl border border-outline-variant/20">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">timer</span>
          </span>
          <div>
            <div className="font-label-sm text-label-sm text-secondary uppercase">
              Academic Suite v1.2 · Interactive Sandbox
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              COOU Study &amp; Assignment Workspace
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => selectPreset(idx)}
              className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer whitespace-nowrap ${
                activePresetIdx === idx
                  ? "bg-primary-container text-on-primary-container shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Pomodoro Focus Module */}
        <div className="lg:col-span-5 bg-surface-container rounded-2xl p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Active Session Course
            </span>
            <span className="font-code-inline text-xs text-tertiary bg-surface-container-low px-2.5 py-1 rounded-md">
              {isRunning ? "Session Active" : "Paused"}
            </span>
          </div>

          <select
            value={activeCourse}
            onChange={(e) => setActiveCourse(e.target.value)}
            aria-label="Select active study course"
            className="w-full bg-surface-container-lowest text-on-surface px-3.5 py-2.5 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="CMP 312: Algorithms">CMP 312: Algorithms</option>
            <option value="CMP 304: Database Systems">CMP 304: Database Systems</option>
            <option value="MTH 301: Discrete Structures">MTH 301: Discrete Structures</option>
            <option value="CMP 318: Human-Computer Interaction">
              CMP 318: Human-Computer Interaction
            </option>
          </select>

          <div className="bg-surface-container-lowest rounded-2xl py-8 px-4 text-center">
            <div className="font-code-inline text-5xl sm:text-6xl font-bold text-on-surface tracking-tight tabular-nums">
              {formatTime(secondsLeft)}
            </div>
            <p className="font-label-sm text-label-sm text-outline mt-2 uppercase tracking-wider">
              {activeCourse}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold hover:bg-inverse-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isRunning ? "pause" : "play_arrow"}
              </span>
              <span>{isRunning ? "Pause Timer" : "Start Focus"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(PRESETS[activePresetIdx].seconds);
              }}
              className="py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right: Course Assignment Queue */}
        <div className="lg:col-span-7 bg-surface-container rounded-2xl p-6 shadow-md space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Assignment Queue
              </span>
              <span className="font-code-inline text-xs text-secondary tabular-nums">
                {remainingCount} tasks remaining · {progressPercent}% daily goal
              </span>
            </div>
            <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
              <div
                className="bg-secondary h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={newCourseCode}
              onChange={(e) => setNewCourseCode(e.target.value)}
              placeholder="CMP 322"
              maxLength={10}
              aria-label="Course code"
              className="sm:w-28 bg-surface-container-lowest text-on-surface placeholder:text-outline px-3 py-2.5 rounded-xl font-code-inline text-xs focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add new assignment or study milestone..."
              aria-label="Assignment title"
              className="flex-1 bg-surface-container-lowest text-on-surface placeholder:text-outline px-3.5 py-2.5 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container font-label-md text-label-md transition-colors cursor-pointer whitespace-nowrap"
            >
              + Add Task
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
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 ${
                      task.completed ? "text-secondary" : "text-outline"
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
                    <div className="font-label-sm text-label-sm text-outline">
                      {task.courseCode} · Due {task.dueLabel}
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
