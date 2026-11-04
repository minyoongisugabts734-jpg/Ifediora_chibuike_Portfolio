import React from "react";
import { PROJECTS, ProjectId, ProjectTab } from "../data/portfolioData";
import { ProductivityDemo } from "./demos/ProductivityDemo";
import { FinanceDemo } from "./demos/FinanceDemo";
import { MarketplaceDemo } from "./demos/MarketplaceDemo";

interface ProjectScreenProps {
  projectId: ProjectId;
  activeTab: ProjectTab;
  onSelectProject: (id: ProjectId, tab?: ProjectTab) => void;
  onChangeTab: (tab: ProjectTab) => void;
  onBackToPortfolio: () => void;
  onContactForProject: () => void;
}

export const ProjectScreen: React.FC<ProjectScreenProps> = ({
  projectId,
  activeTab,
  onSelectProject,
  onChangeTab,
  onBackToPortfolio,
  onContactForProject,
}) => {
  const project = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0];

  const toneBadgeClass =
    project.accentTone === "primary"
      ? "bg-primary-fixed text-primary"
      : project.accentTone === "secondary"
      ? "bg-secondary-fixed text-secondary"
      : "bg-tertiary-fixed text-tertiary";

  const toneMetricClass =
    project.accentTone === "primary"
      ? "text-primary"
      : project.accentTone === "secondary"
      ? "text-secondary"
      : "text-tertiary";

  return (
    <div className="relative w-full overflow-hidden pb-space-xl">
      {/* Subtle Top Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop pt-8 lg:pt-12 space-y-8">
        {/* Top Bar: Back + Project Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">arrow_back</span>
            <span>Back to Portfolio</span>
          </button>

          <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl">
            {PROJECTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProject(item.id, activeTab)}
                className={`px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm transition-colors cursor-pointer whitespace-nowrap ${
                  item.id === project.id
                    ? "bg-surface-container-lowest text-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Project Hero Summary Card */}
        <div className="bg-surface-container-low rounded-2xl p-space-lg lg:p-space-xl shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[11px] font-bold ${toneBadgeClass}`}
              >
                <span className="material-symbols-outlined text-[15px]">{project.suiteIcon}</span>
                <span>{project.suiteLabel}</span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {project.timeline}
              </span>
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>GitHub Repository</span>
            </a>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-headline-xl-mobile lg:text-headline-xl text-on-surface tracking-tight">
              {project.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline-variant/40">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`px-2.5 py-1 rounded font-label-sm text-label-sm ${
                    tag.emphasized
                      ? `${toneBadgeClass} font-semibold`
                      : "bg-surface-container-lowest text-on-surface font-medium"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">
              Role: <span className="text-on-surface font-semibold">{project.role}</span>
            </div>
          </div>
        </div>

        {/* Interactive Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-container-low p-1.5 rounded-xl w-fit">
          {(
            [
              { id: "case-study", label: "Case Study", icon: "folder_special" },
              { id: "demo", label: "Interactive Live Demo", icon: "play_circle" },
              { id: "architecture", label: "Code & Architecture", icon: "terminal" },
            ] as { id: ProjectTab; label: string; icon: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary-container text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Case Study */}
        {activeTab === "case-study" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {project.impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-surface-container-low rounded-xl p-space-lg space-y-1.5"
                >
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                    {metric.label}
                  </span>
                  <div
                    className={`font-headline-lg text-headline-lg font-bold tabular-nums ${toneMetricClass}`}
                  >
                    {metric.value}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    psychology_alt
                  </span>
                  <span>Operational Challenge</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  The Problem Space
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-3">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-sm text-label-sm font-semibold ${toneBadgeClass}`}
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Strategic &amp; Technical Solution</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Product Execution
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-space-lg lg:p-space-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Design &amp; Workflow Decisions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.designDecisions.map((item) => (
                    <div key={item.title} className="space-y-1">
                      <div className="font-label-md text-label-md text-primary font-bold">
                        {item.title}
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onChangeTab("demo")}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                <span>Launch Interactive Demo</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Live Interactive Demo */}
        {activeTab === "demo" && (
          <div>
            {project.id === "productivity" && <ProductivityDemo />}
            {project.id === "finance" && <FinanceDemo />}
            {project.id === "marketplace" && <MarketplaceDemo />}
          </div>
        )}

        {/* Tab 3: Architecture & Code (styled like Hero's bg-inverse-surface card) */}
        {activeTab === "architecture" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            {project.architectureHighlights.map((block) => (
              <div
                key={block.title}
                className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {block.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="bg-inverse-surface rounded-xl p-4 text-inverse-on-surface shadow-md">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-outline-variant/20">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-error" />
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                      <div className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed" />
                    </div>
                    <span className="font-label-sm text-label-sm text-outline-variant font-mono">
                      module.config.ts
                    </span>
                  </div>
                  <pre className="font-code-inline text-code-inline leading-relaxed font-mono text-secondary-fixed whitespace-pre-wrap overflow-x-auto">
                    {block.codeSnippet}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Collaboration Callout */}
        <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Want to discuss {project.title} or collaborate on a build?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Reach out for internships, software projects, or product engineering conversations.
            </p>
          </div>
          <button
            type="button"
            onClick={onContactForProject}
            className="px-space-lg py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </div>
  );
};
