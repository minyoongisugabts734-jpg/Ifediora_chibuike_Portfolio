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

  return (
    <div className="relative w-full overflow-hidden pb-20">
      {/* Top Ambient Glow matching Home Screen */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-primary-container/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-10 lg:pt-14 space-y-10">
        {/* Top Breadcrumb & Project Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Portfolio</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 bg-surface-container-lowest p-1.5 rounded-xl">
            {PROJECTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProject(item.id, activeTab)}
                className={`px-3.5 py-1.5 rounded-lg font-label-sm text-label-sm transition-colors cursor-pointer whitespace-nowrap ${
                  item.id === project.id
                    ? "bg-surface-container-highest text-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Project Hero Header */}
        <div className="bg-surface-container-low rounded-3xl p-8 lg:p-12 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 font-label-md text-label-md text-secondary">
              <span className="material-symbols-outlined text-[18px]">{project.suiteIcon}</span>
              <span>{project.suiteLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-on-surface-variant">{project.timeline}</span>
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>Repository Reference</span>
            </a>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-display-mobile lg:text-display text-on-surface font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-3 font-code-inline text-xs text-secondary">
              {project.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  {idx > 0 && (
                    <span className="text-outline" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="font-label-sm text-label-sm text-outline">
              Role: <span className="text-on-surface">{project.role}</span>
            </div>
          </div>
        </div>

        {/* Mode Switch Tabs: Case Study | Interactive Demo | Architecture */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-container-lowest p-1.5 rounded-2xl w-fit">
          {(
            [
              { id: "case-study", label: "Case Study Overview", icon: "menu_book" },
              { id: "demo", label: "Interactive Live Demo", icon: "play_circle" },
              { id: "architecture", label: "Architecture & Code", icon: "terminal" },
            ] as { id: ProjectTab; label: string; icon: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary-container text-on-primary-container shadow-[0_0_16px_rgba(37,99,235,0.35)]"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Case Study */}
        {activeTab === "case-study" && (
          <div className="space-y-10">
            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-surface-container rounded-2xl p-6 shadow-md space-y-2"
                >
                  <span className="font-label-sm text-label-sm text-outline uppercase">
                    {metric.label}
                  </span>
                  <div className="font-headline-lg text-headline-lg text-secondary font-bold tabular-nums">
                    {metric.value}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Problem & Solution Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-surface-container rounded-2xl p-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-tertiary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[20px]">help_clinic</span>
                  <span>The Problem</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  User Friction &amp; Context
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="bg-surface-container rounded-2xl p-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span>The Solution</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Engineering &amp; UX Execution
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Design Decisions + Prompt to launch Live Demo */}
            <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Key UI/UX Decisions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.designDecisions.map((item) => (
                    <div key={item.title} className="space-y-1.5">
                      <div className="font-body-md text-body-md text-primary font-semibold">
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
                className="shrink-0 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary-container hover:bg-inverse-primary text-on-primary-container font-label-md text-label-md font-semibold shadow-[0_0_24px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                <span>Try Interactive Demo</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Live Demo */}
        {activeTab === "demo" && (
          <div className="space-y-8">
            {project.id === "productivity" && <ProductivityDemo />}
            {project.id === "finance" && <FinanceDemo />}
            {project.id === "marketplace" && <MarketplaceDemo />}
          </div>
        )}

        {/* Tab 3: Architecture & Code */}
        {activeTab === "architecture" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {project.architectureHighlights.map((block) => (
              <div
                key={block.title}
                className="bg-surface-container rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {block.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-4 font-code-inline text-xs text-on-surface overflow-x-auto">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-outline-variant/20 text-outline">
                    <span>implementation.ts</span>
                    <span className="material-symbols-outlined text-[15px]">terminal</span>
                  </div>
                  <pre className="leading-relaxed text-secondary whitespace-pre-wrap">
                    {block.codeSnippet}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Collaboration CTA */}
        <div className="bg-surface-container rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Interested in how I built {project.title}?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Let&apos;s discuss engineering internships, frontend architecture, or collaborative
              builds.
            </p>
          </div>
          <button
            type="button"
            onClick={onContactForProject}
            className="px-6 py-3 rounded-xl bg-primary-container hover:bg-inverse-primary text-on-primary-container font-label-md text-label-md font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Start a Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
