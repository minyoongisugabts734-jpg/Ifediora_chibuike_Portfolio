import React, { useState } from "react";
import { PROJECTS, ProjectId, ProjectTab } from "../../data/portfolioData";

interface ProjectsCatalogScreenProps {
  onOpenProject: (id: ProjectId, tab: ProjectTab) => void;
  onContact: () => void;
}

export const ProjectsCatalogScreen: React.FC<ProjectsCatalogScreenProps> = ({
  onOpenProject,
  onContact,
}) => {
  const [filter, setFilter] = useState<"all" | ProjectId>("all");

  const visibleProjects = PROJECTS.filter((p) => filter === "all" || p.id === filter);

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Header & Filter Bar */}
      <section className="w-full py-space-xl lg:py-20">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary-fixed/50 font-label-sm text-label-sm text-primary font-bold">
                <span className="material-symbols-outlined text-[16px]">folder_special</span>
                <span>Portfolio Highlights &amp; Live Sandboxes</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight leading-[1.15]">
                Projects That Bring{" "}
                <span className="bg-gradient-to-r from-primary-container via-secondary to-tertiary-container bg-clip-text text-transparent">
                  Ideas to Life
                </span>
                .
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Explore full case studies, inspect modular code architecture, and test live
                interactive sandboxes built with clarity, operational utility, and human-centered UX.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl w-fit">
              {(
                [
                  { id: "all", label: "All Projects (3)" },
                  { id: "productivity", label: "Academic Tool" },
                  { id: "finance", label: "Finance Matrix" },
                  { id: "marketplace", label: "P2P Exchange" },
                ] as { id: "all" | ProjectId; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg font-label-sm text-label-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    filter === tab.id
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Project Showcases */}
          <div className="space-y-8">
            {visibleProjects.map((project) => {
              const headerGradient =
                project.accentTone === "primary"
                  ? "from-primary-fixed to-surface-container-high"
                  : project.accentTone === "secondary"
                  ? "from-secondary-fixed to-surface-container-high"
                  : "from-tertiary-fixed to-surface-container-high";

              const accentText =
                project.accentTone === "primary"
                  ? "text-primary"
                  : project.accentTone === "secondary"
                  ? "text-secondary"
                  : "text-tertiary";

              const accentBadge =
                project.accentTone === "primary"
                  ? "bg-primary-fixed text-primary"
                  : project.accentTone === "secondary"
                  ? "bg-secondary-fixed text-secondary"
                  : "bg-tertiary-fixed text-tertiary";

              return (
                <div
                  key={project.id}
                  className="bg-surface-container-low rounded-2xl p-space-md lg:p-space-lg shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch"
                >
                  {/* Visual Mockup Column */}
                  <div
                    onClick={() => onOpenProject(project.id, "demo")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onOpenProject(project.id, "demo");
                    }}
                    className={`lg:col-span-5 rounded-xl bg-gradient-to-br ${headerGradient} p-6 flex flex-col justify-between min-h-64 cursor-pointer group overflow-hidden`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-surface-container-lowest/90 ${accentText}`}
                      >
                        {project.suiteLabel}
                      </span>
                      <span className={`material-symbols-outlined text-[22px] ${accentText}`}>
                        {project.suiteIcon}
                      </span>
                    </div>

                    {/* Interactive Preview Sketch matching reference HTML */}
                    {project.id === "productivity" && (
                      <div className="bg-surface-container-lowest/95 rounded-xl p-4 shadow-md backdrop-blur-sm transition-transform group-hover:-translate-y-1.5 duration-300 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">
                            Pomodoro &amp; Deadline Tracker
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2.5 rounded-full bg-primary-fixed w-3/4" />
                          <div className="h-2.5 rounded-full bg-surface-container w-1/2" />
                        </div>
                        <div className="flex justify-between font-mono text-[11px] text-primary font-bold pt-1">
                          <span>25:00 Focus Cycle</span>
                          <span>+42% Adherence</span>
                        </div>
                      </div>
                    )}

                    {project.id === "finance" && (
                      <div className="bg-surface-container-lowest/95 rounded-xl p-4 shadow-md backdrop-blur-sm transition-transform group-hover:-translate-y-1.5 duration-300 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">
                            Monthly Net Flow
                          </span>
                          <span className="text-[11px] font-bold text-secondary font-mono">
                            +18.4%
                          </span>
                        </div>
                        <div className="flex items-end gap-2 h-12 pt-1">
                          <div className="w-full bg-secondary-fixed-dim h-6 rounded-t" />
                          <div className="w-full bg-secondary-container h-10 rounded-t" />
                          <div className="w-full bg-secondary h-12 rounded-t" />
                          <div className="w-full bg-secondary-fixed h-8 rounded-t" />
                        </div>
                      </div>
                    )}

                    {project.id === "marketplace" && (
                      <div className="bg-surface-container-lowest/95 rounded-xl p-4 shadow-md backdrop-blur-sm transition-transform group-hover:-translate-y-1.5 duration-300 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">
                            COOU Peer Marketplace
                          </span>
                          <span className="text-[11px] font-bold text-tertiary">Verified</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary text-xs font-bold">
                            B.Sc
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="h-2.5 rounded-full bg-tertiary-fixed-dim w-4/5" />
                            <div className="h-2.5 rounded-full bg-surface-container w-3/5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Narrative, Metrics & Action Buttons */}
                  <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((t) => (
                            <span
                              key={t.label}
                              className={`px-2.5 py-0.5 rounded font-label-sm text-label-sm ${
                                t.emphasized
                                  ? `${accentBadge} font-semibold`
                                  : "bg-surface-container text-on-surface font-medium"
                              }`}
                            >
                              {t.label}
                            </span>
                          ))}
                        </div>
                        <span className="font-label-sm text-label-sm text-outline">
                          {project.timeline}
                        </span>
                      </div>

                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        {project.title}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {project.overview}
                      </p>

                      <div className="grid grid-cols-3 gap-3 pt-2">
                        {project.impactMetrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-3 rounded-lg bg-surface-container-low space-y-0.5"
                          >
                            <div className={`font-mono text-base font-bold ${accentText}`}>
                              {m.value}
                            </div>
                            <div className="font-label-sm text-[11px] text-on-surface-variant">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-outline-variant/30">
                      <button
                        type="button"
                        onClick={() => onOpenProject(project.id, "demo")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">play_circle</span>
                        <span>Launch Live Demo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenProject(project.id, "case-study")}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                      >
                        <span>Read Case Study</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenProject(project.id, "architecture")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">code</span>
                        <span>Architecture</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="bg-surface-container-low rounded-2xl p-space-lg lg:p-space-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Have a product idea or engineering role in mind?
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                I&apos;m open to internships, junior frontend roles, and collaborative ventures.
              </p>
            </div>
            <button
              type="button"
              onClick={onContact}
              className="px-space-lg py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
