import React, { useState } from "react";
import { AppScreen } from "../Header";

interface SkillsScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

type SkillDomain = "all" | "development" | "design" | "strategy";

export const SkillsScreen: React.FC<SkillsScreenProps> = ({ onNavigate }) => {
  const [domainFilter, setDomainFilter] = useState<SkillDomain>("all");

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Skills Hero & Stack Overview */}
      <section className="w-full py-space-xl lg:py-20">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary-fixed/50 font-label-sm text-label-sm text-primary font-bold">
                <span className="material-symbols-outlined text-[16px]">terminal</span>
                <span>Competency Matrix &amp; Methodologies</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight leading-[1.15]">
                Technologies, Design Systems &amp;{" "}
                <span className="bg-gradient-to-r from-primary-container via-secondary to-tertiary-container bg-clip-text text-transparent">
                  Strategic Workflow
                </span>
                .
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Transparent evaluation of my hands-on engineering tools, UI/UX design processes, and
                business management capabilities cultivated at COOU Igbariam and through real-world
                builds.
              </p>
            </div>

            {/* Dark Telemetry Config Card matching Hero */}
            <div className="lg:col-span-5">
              <div className="bg-inverse-surface rounded-xl p-5 text-inverse-on-surface shadow-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-error" />
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                    <div className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed" />
                  </div>
                  <span className="font-label-sm text-label-sm text-outline-variant font-mono">
                    toolkit.config.js
                  </span>
                </div>
                <div className="font-code-inline text-code-inline leading-relaxed font-mono">
                  <span className="text-tertiary-fixed-dim">export const</span>{" "}
                  <span className="text-primary-fixed">capabilities</span> = {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-secondary-fixed-dim">frontend</span>: [
                  <span className="text-secondary-container">&apos;React&apos;</span>,{" "}
                  <span className="text-secondary-container">&apos;JS ES6+&apos;</span>,{" "}
                  <span className="text-secondary-container">&apos;Tailwind&apos;</span>],
                  <br />
                  &nbsp;&nbsp;<span className="text-secondary-fixed-dim">backend</span>: [
                  <span className="text-secondary-container">&apos;Python&apos;</span>,{" "}
                  <span className="text-secondary-container">&apos;REST APIs&apos;</span>,{" "}
                  <span className="text-secondary-container">&apos;Node.js&apos;</span>],
                  <br />
                  &nbsp;&nbsp;<span className="text-secondary-fixed-dim">design</span>: [
                  <span className="text-secondary-container">&apos;Figma&apos;</span>,{" "}
                  <span className="text-secondary-container">&apos;Prototyping&apos;</span>],
                  <br />
                  &nbsp;&nbsp;<span className="text-secondary-fixed-dim">strategy</span>:{" "}
                  <span className="text-primary-fixed-dim">
                    &apos;B.Sc. Business Admin&apos;
                  </span>
                  <br />
                  {"};"}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl">
              {(
                [
                  { id: "all", label: "All Competencies" },
                  { id: "development", label: "Development" },
                  { id: "design", label: "Design & UX" },
                  { id: "strategy", label: "Strategy & Soft Skills" },
                ] as { id: SkillDomain; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDomainFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer whitespace-nowrap ${
                    domainFilter === tab.id
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Competency Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {(domainFilter === "all" || domainFilter === "development") && (
              <div
                className={`bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md ${
                  domainFilter === "development" ? "md:col-span-3" : ""
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">terminal</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Development
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Front-End &amp; Core Logic
                    </p>
                  </div>
                </div>
                <div
                  className={`grid gap-space-xs ${
                    domainFilter === "development" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {[
                    { name: "HTML & Semantic Web", badge: "Proficient", highlight: false },
                    { name: "CSS3 & Tailwind CSS", badge: "Advanced", highlight: true },
                    { name: "JavaScript ES6+", badge: "Proficient", highlight: false },
                    { name: "React & Components", badge: "Proficient", highlight: false },
                    { name: "Python Programming", badge: "Academic Core", highlight: false },
                    { name: "Git Version Control", badge: "Workflow", highlight: false },
                    { name: "RESTful API Integration", badge: "Applied", highlight: false },
                    { name: "Node.js & JSON Modeling", badge: "Learning", highlight: false },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">
                        {item.name}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          item.highlight
                            ? "bg-primary-container text-on-primary"
                            : "bg-primary-fixed text-primary"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(domainFilter === "all" || domainFilter === "design") && (
              <div
                className={`bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md ${
                  domainFilter === "design" ? "md:col-span-3" : ""
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">draw</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Design &amp; UX
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Interface &amp; Layout Systems
                    </p>
                  </div>
                </div>
                <div
                  className={`grid gap-space-xs ${
                    domainFilter === "design" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {[
                    { name: "Figma UI / Design System", badge: "Advanced", highlight: true },
                    { name: "Wireframing & Sitemaps", badge: "Proficient", highlight: false },
                    { name: "Interactive Prototyping", badge: "Proficient", highlight: false },
                    { name: "Responsive Layouts", badge: "Specialist", highlight: true },
                    { name: "UI Accessibility Standards", badge: "Standard", highlight: false },
                    { name: "Design-to-Code Handoff", badge: "Proficient", highlight: false },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">
                        {item.name}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          item.highlight
                            ? "bg-secondary-container text-on-secondary-container"
                            : "bg-secondary-fixed text-secondary"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(domainFilter === "all" || domainFilter === "strategy") && (
              <div
                className={`bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md ${
                  domainFilter === "strategy" ? "md:col-span-3" : ""
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Strategy &amp; Soft Skills
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Business &amp; Communication
                    </p>
                  </div>
                </div>
                <div
                  className={`grid gap-space-xs ${
                    domainFilter === "strategy" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {[
                    { name: "Analytical Problem Solving", badge: "Core Strength" },
                    { name: "Technical Communication", badge: "Effective" },
                    { name: "Cross-Functional Synergy", badge: "Team Player" },
                    { name: "Project Delivery Timelines", badge: "Disciplined" },
                    { name: "Organizational Strategy", badge: "B.Sc Focus" },
                    { name: "User & Market Discovery", badge: "Applied" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm"
                    >
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">
                        {item.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-tertiary">
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4-Step Delivery Methodology */}
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Execution Process
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface mt-1">
                How I Turn Ideas Into Software
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("projects")}
              className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-bold hover:underline cursor-pointer"
            >
              <span>See This Process in My Projects</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {[
              {
                step: "01",
                icon: "lightbulb",
                title: "Business & User Discovery",
                desc: "Define operational bottlenecks, user personas, and measurable outcomes before writing code.",
              },
              {
                step: "02",
                icon: "draw",
                title: "Wireframing & Figma UI",
                desc: "Establish clean information architecture, responsive spacing tokens, and accessible contrast.",
              },
              {
                step: "03",
                icon: "code_blocks",
                title: "Modular Engineering",
                desc: "Build reusable React components, predictable state logic, and resilient data persistence.",
              },
              {
                step: "04",
                icon: "verified",
                title: "Testing & Refinement",
                desc: "Verify cross-device responsiveness, interaction speed, and real-world usability.",
              },
            ].map((phase) => (
              <div
                key={phase.step}
                className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">{phase.icon}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-outline">{phase.step}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {phase.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
