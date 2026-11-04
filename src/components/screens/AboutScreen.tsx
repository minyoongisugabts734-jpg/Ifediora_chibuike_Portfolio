import React from "react";
import { SafeImage } from "../SafeImage";
import { HERO_PORTRAIT_URL, RESUME_DATA } from "../../data/portfolioData";
import { AppScreen } from "../Header";

interface AboutScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Ambient Top Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Executive Biography Split */}
      <section className="w-full py-space-xl lg:py-20">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary-fixed/50 w-fit">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  pin_drop
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  Anambra State, Nigeria • Faculty of Management Sciences
                </span>
              </div>

              <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight leading-[1.15]">
                Bridging{" "}
                <span className="bg-gradient-to-r from-primary-container via-secondary to-tertiary-container bg-clip-text text-transparent">
                  Business Strategy
                </span>{" "}
                &amp; Software Craft.
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                I am <strong>Ifediora Chibuike David</strong>, currently pursuing a Bachelor of
                Science in Business Administration at Chukwuemeka Odumegwu Ojukwu University (COOU),
                Igbariam campus (Class of 2025). My academic journey sharpens my strategic acumen in
                organisational behavior, operational systems, and financial frameworks.
              </p>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Simultaneously, I channel relentless curiosity into modern software development and
                digital user experience design. Whether architecting React interfaces, modeling JSON
                data flows, or wireframing user journeys in Figma, I approach software not just as
                lines of code—but as measurable operational leverage for people and businesses.
              </p>

              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <button
                  type="button"
                  onClick={() => onNavigate("resume")}
                  className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>View &amp; Download CV</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("projects")}
                  className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface hover:text-primary font-label-md text-label-md shadow-sm transition-all cursor-pointer"
                >
                  <span>Explore Portfolio Projects</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Portrait & Academic Verification Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-surface-container-low rounded-xl p-3 shadow-xl space-y-3">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-surface-container">
                  <SafeImage
                    src={HERO_PORTRAIT_URL}
                    alt="Ifediora Chibuike David — COOU Igbariam Scholar"
                    fallbackInitials="ICD"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-on-surface/65 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                    <div>
                      <div className="font-label-md text-label-md font-bold tracking-tight">
                        Ifediora Chibuike David
                      </div>
                      <div className="font-label-sm text-label-sm text-on-primary/85">
                        B.Sc. Business Admin • Class of 2025
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-container/80 backdrop-blur-md flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] text-on-primary">
                        verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                    lightbulb
                  </span>
                  <div>
                    <div className="font-label-md text-label-md text-on-surface font-bold">
                      The Strategic Advantage
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Where business process clarity guides clean front-end interaction models.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Strategic Pillars + Academic Coursework */}
      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-10">
          <div className="max-w-2xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Operating Principles
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface mt-1">
              What Drives My Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center group-hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors text-[24px]">
                  code_blocks
                </span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                Continuous Growth
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Currently Learning
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Diving deep into component lifecycle design, advanced React patterns, state
                management fundamentals, and backend Node.js APIs to build cohesive end-to-end
                applications.
              </p>
            </div>

            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center group-hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary-container transition-colors text-[24px]">
                  rocket_launch
                </span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block">
                Applied Passion
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                What I Enjoy Building
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Focused on pragmatic campus utilities, student productivity enhancers, responsive
                web dashboards, and community marketplaces that eliminate friction in everyday
                Nigerian university workflows.
              </p>
            </div>

            <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center group-hover:bg-tertiary-container transition-colors">
                <span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary-container transition-colors text-[24px]">
                  flag
                </span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold block">
                Future Direction
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                My Career Goal
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Securing internship and software engineering roles within high-performance teams
                across Nigerian and global tech/fintech ecosystems where I can contribute actively
                and elevate my craftsmanship.
              </p>
            </div>
          </div>

          {/* Academic Foundation Strip */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-secondary font-bold uppercase">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Academic Foundation</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                {RESUME_DATA.education[0].degree}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {RESUME_DATA.education[0].institution} • {RESUME_DATA.education[0].faculty} (
                {RESUME_DATA.education[0].period})
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {RESUME_DATA.education[0].coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer"
            >
              <span>Connect With Me</span>
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </button>
          </div>
        </div>
      </section>

      {/* Chronology Timeline */}
      <section className="w-full py-space-xl lg:py-24">
        <div className="max-w-4xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="text-center mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Chronology
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface mt-1">
              My Journey So Far
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-space-xs">
              An ongoing evolution of continuous learning, foundational academic study, and tangible
              software craft.
            </p>
          </div>

          <div className="relative pl-6 md:pl-8 space-y-10">
            <div className="absolute top-2 bottom-2 left-2 md:left-2.5 w-0.5 bg-surface-container-highest" />

            <div className="relative group">
              <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-outline" />
              </div>
              <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-xl">
                <span className="px-2.5 py-0.5 rounded font-mono text-[12px] font-bold bg-surface-container-lowest text-on-surface-variant">
                  2022 — 2023
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">
                  First Lines of Code &amp; Foundations
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Discovered a passion for programming. Immersed in foundational semantic HTML5, CSS
                  responsive layouts, and vanilla JavaScript fundamentals, building static personal
                  tools and experiments.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
              </div>
              <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-xl">
                <span className="px-2.5 py-0.5 rounded font-mono text-[12px] font-bold bg-secondary-fixed text-secondary">
                  2023 — 2024
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">
                  Academic Growth at COOU Igbariam
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Commenced intensive B.Sc. studies in Business Administration under the Faculty of
                  Management Sciences. Synthesized business analysis, management information
                  workflows, and programmatic problem solving.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-low flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />
              </div>
              <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-xl">
                <span className="px-2.5 py-0.5 rounded font-mono text-[12px] font-bold bg-tertiary-fixed text-tertiary">
                  2024
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">
                  Interactive Applications &amp; UI/UX
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Transitioned to single-page applications using React, modern component
                  architecture, and advanced Figma prototyping. Engineered pragmatic web utilities
                  for student productivity.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm ring-4 ring-primary/20">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
              </div>
              <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-xl ring-1 ring-primary/15">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono text-[12px] font-bold bg-primary-fixed text-primary">
                    PRESENT
                  </span>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                    Active Search
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">
                  Seeking Opportunities &amp; Professional Growth
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Ready to bring energy, high-velocity learning, and business-grounded frontend
                  engineering to developer internships, contract builds, and forward-thinking
                  collaborative tech teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
