import React, { useState } from "react";
import { AppScreen, Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SafeImage } from "./components/SafeImage";
import { ProjectScreen } from "./components/ProjectScreen";
import { ResumeScreen } from "./components/ResumeScreen";
import { AboutScreen } from "./components/screens/AboutScreen";
import { SkillsScreen } from "./components/screens/SkillsScreen";
import { ProjectsCatalogScreen } from "./components/screens/ProjectsCatalogScreen";
import { ContactScreen } from "./components/screens/ContactScreen";
import {
  CONTACT_INFO,
  HERO_PORTRAIT_URL,
  ProjectId,
  ProjectTab,
} from "./data/portfolioData";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>("home");
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId>("productivity");
  const [selectedProjectTab, setSelectedProjectTab] = useState<ProjectTab>("case-study");

  // Home screen contact form state matching the attached HTML's interactive behavior
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("internship");
  const [contactMessage, setContactMessage] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");

  const navigateScreen = (screen: AppScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProject = (id: ProjectId, tab: ProjectTab = "case-study") => {
    setSelectedProjectId(id);
    setSelectedProjectTab(tab);
    setActiveScreen("project-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "sending") return;
    setSubmitState("sending");
    window.setTimeout(() => {
      setSubmitState("sent");
      setContactName("");
      setContactEmail("");
      setContactSubject("internship");
      setContactMessage("");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest font-body-md text-on-surface">
      <Header activeScreen={activeScreen} onNavigate={navigateScreen} />

      <main className="w-full pt-16 bg-surface-container-lowest flex-1">
        {activeScreen === "about" && <AboutScreen onNavigate={navigateScreen} />}

        {activeScreen === "skills" && <SkillsScreen onNavigate={navigateScreen} />}

        {activeScreen === "projects" && (
          <ProjectsCatalogScreen
            onOpenProject={openProject}
            onContact={() => navigateScreen("contact")}
          />
        )}

        {activeScreen === "contact" && <ContactScreen />}

        {activeScreen === "project-detail" && (
          <ProjectScreen
            projectId={selectedProjectId}
            activeTab={selectedProjectTab}
            onSelectProject={(id, tab) => openProject(id, tab || "case-study")}
            onChangeTab={setSelectedProjectTab}
            onBackToPortfolio={() => navigateScreen("projects")}
            onContactForProject={() => navigateScreen("contact")}
          />
        )}

        {activeScreen === "resume" && (
          <ResumeScreen
            onBackToPortfolio={() => navigateScreen("home")}
            onOpenProject={(id) => openProject(id, "case-study")}
            onContact={() => navigateScreen("contact")}
          />
        )}

        {activeScreen === "home" && (
          <div className="flex flex-col w-full">
            {/* TOP AMBIENT GLOW */}
            <div className="relative w-full overflow-hidden">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-10" />
              <div className="absolute top-48 -right-32 w-96 h-96 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
            </div>

            {/* HERO SECTION */}
            <section className="w-full py-space-xl lg:py-24">
              <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-center">
                  {/* Left Column: Executive Value Proposition */}
                  <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
                    {/* Availability Pill */}
                    <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-low shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
                      <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide">
                        Available for Internships &amp; Roles
                      </span>
                    </div>

                    {/* Academic Affiliation Tag */}
                    <div className="inline-flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[18px] text-tertiary">
                        school
                      </span>
                      <span>B.Sc. Business Administration • COOU Igbariam, Anambra State</span>
                    </div>

                    {/* Primary Hero Title */}
                    <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl text-on-surface tracking-tight leading-[1.15]">
                      Hello, I&apos;m{" "}
                      <span className="text-on-surface font-black">Ifediora Chibuike David</span>. I
                      Build{" "}
                      <span className="bg-gradient-to-r from-primary-container via-secondary to-tertiary-container bg-clip-text text-transparent">
                        Digital Experiences
                      </span>
                      .
                    </h1>

                    {/* Supporting Pitch */}
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                      I&apos;m a tech enthusiast, aspiring software engineer, and digital product
                      designer passionate about bridging rigorous business management strategies
                      with modern, high-performance web development.
                    </p>

                    {/* Core Call-to-Actions */}
                    <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
                      <a
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all duration-200 hover:-translate-y-0.5"
                        href="#featured-projects"
                      >
                        <span>Explore My Projects</span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_downward
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => navigateScreen("resume")}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container hover:text-primary transition-all duration-200 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          download
                        </span>
                        <span>Download My CV</span>
                      </button>
                    </div>

                    {/* Fast Social Connect Strip */}
                    <div className="flex flex-wrap items-center gap-space-md pt-space-sm text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                        Connect:
                      </span>
                      <a
                        className="flex items-center gap-1.5 font-label-sm text-label-sm hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-surface-container-low"
                        href={CONTACT_INFO.linkedinUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          share
                        </span>
                        <span>LinkedIn</span>
                      </a>
                      <a
                        className="flex items-center gap-1.5 font-label-sm text-label-sm hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-surface-container-low"
                        href={CONTACT_INFO.githubUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          code
                        </span>
                        <span>GitHub</span>
                      </a>
                      <a
                        className="flex items-center gap-1.5 font-label-sm text-label-sm hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-surface-container-low"
                        href={`mailto:${CONTACT_INFO.email}`}
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          mail
                        </span>
                        <span>Email</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Student Portrait & Code Telemetry */}
                  <div className="lg:col-span-5 relative flex justify-center mt-space-lg lg:mt-0">
                    <div className="relative w-full max-w-md bg-surface-container-low rounded-xl p-3 shadow-xl">
                      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-surface-container">
                        <SafeImage
                          alt="Ifediora Chibuike David - Academic and Developer Portrait"
                          className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500 ease-out"
                          fallbackInitials="ICD"
                          src={HERO_PORTRAIT_URL}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-on-surface/60 to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                          <div>
                            <div className="font-label-md text-label-md font-bold tracking-tight">
                              Ifediora Chibuike David
                            </div>
                            <div className="font-label-sm text-label-sm text-on-primary/80">
                              COOU Igbariam • Class of 2025
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-primary-container/80 backdrop-blur-md flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-on-primary">
                              verified
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Overlaid Code Config Card */}
                      <div className="mt-3 bg-inverse-surface rounded-lg p-3 text-inverse-on-surface shadow-md">
                        <div className="flex items-center justify-between pb-2 mb-2 bg-inverse-surface">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-error" />
                            <div className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                            <div className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed" />
                          </div>
                          <span className="font-label-sm text-label-sm text-outline-variant font-mono">
                            profile.config.js
                          </span>
                        </div>
                        <div className="font-code-inline text-code-inline leading-relaxed font-mono">
                          <span className="text-tertiary-fixed-dim">const</span>{" "}
                          <span className="text-primary-fixed">student</span> = {"{"}
                          <br />
                          &nbsp;&nbsp;<span className="text-secondary-fixed-dim">name</span>:{" "}
                          <span className="text-secondary-container">
                            &apos;Ifediora Chibuike David&apos;
                          </span>
                          ,
                          <br />
                          &nbsp;&nbsp;<span className="text-secondary-fixed-dim">institution</span>:{" "}
                          <span className="text-secondary-container">
                            &apos;COOU Igbariam&apos;
                          </span>
                          ,
                          <br />
                          &nbsp;&nbsp;<span className="text-secondary-fixed-dim">faculty</span>:{" "}
                          <span className="text-secondary-container">
                            &apos;Management Sciences&apos;
                          </span>
                          ,
                          <br />
                          &nbsp;&nbsp;<span className="text-secondary-fixed-dim">degree</span>:{" "}
                          <span className="text-secondary-container">
                            &apos;B.Sc. Business Admin&apos;
                          </span>
                          ,
                          <br />
                          &nbsp;&nbsp;<span className="text-secondary-fixed-dim">status</span>:{" "}
                          <span className="text-primary-fixed-dim">
                            &apos;Open to Roles &amp; Projects&apos;
                          </span>
                          <br />
                          {"};"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TECHNOLOGIES I WORK WITH */}
            <section className="w-full py-space-lg bg-surface-container-low">
              <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs mb-space-md">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Stack Overview
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Technologies &amp; Workflow
                    </h2>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                    Applied tools blending clean frontend experiences, structured script logic, and
                    strategic workflow patterns.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  {/* Frontend */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-space-xs mb-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">
                          desktop_windows
                        </span>
                      </div>
                      <h3 className="font-label-md text-label-md text-on-surface font-bold">
                        Frontend Engineering
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        HTML5 Semantic
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        CSS3 Architecture
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        JavaScript (ES6+)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
                        React &amp; Hooks
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        Tailwind CSS
                      </span>
                    </div>
                  </div>

                  {/* Backend & Scripting */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-space-xs mb-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">database</span>
                      </div>
                      <h3 className="font-label-md text-label-md text-on-surface font-bold">
                        Backend &amp; Scripting
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        Python Programming
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        RESTful API Integration
                      </span>
                      <span className="px-2.5 py-1 rounded bg-secondary-fixed text-secondary font-label-sm text-label-sm font-semibold">
                        Node.js (Learning)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        JSON Data Modeling
                      </span>
                    </div>
                  </div>

                  {/* Workflow & Tools */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-space-xs mb-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[18px]">construction</span>
                      </div>
                      <h3 className="font-label-md text-label-md text-on-surface font-bold">
                        Tools &amp; Workflow
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        Git Version Control
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        GitHub Workflows
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                        VS Code Config
                      </span>
                      <span className="px-2.5 py-1 rounded bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-semibold">
                        Figma Prototyping
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section className="w-full py-space-xl lg:py-24">
              <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12">
                  {/* Left: Narrative and Profile Context */}
                  <div className="lg:col-span-5 flex flex-col gap-space-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary-fixed/50 w-fit">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        pin_drop
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">
                        Anambra State, Nigeria • Faculty of Management Sciences
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
                      A Little About Me
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      I am currently pursuing a Bachelor of Science in Business Administration at
                      Chukwuemeka Odumegwu Ojukwu University (COOU), Igbariam campus. My academic
                      journey sharpens my strategic acumen in organisational behavior, operational
                      systems, and financial frameworks.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Simultaneously, I channel relentless curiosity into modern software
                      development and digital user experience design. This cross-disciplinary
                      synergy gives me an uncommon edge: understanding both the quantitative
                      business rationale and the software architecture necessary to ship impactful
                      software.
                    </p>
                    <div className="mt-space-sm p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[24px]">
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

                  {/* Right: 3 Structured Strategic Cards */}
                  <div className="lg:col-span-7 flex flex-col gap-space-md justify-center">
                    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-start gap-space-md">
                        <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors">
                          <span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors text-[24px]">
                            code_blocks
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                            Continuous Growth
                          </span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                            Currently Learning
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                            Diving deep into component lifecycle design, advanced React patterns,
                            state management fundamentals, and backend Node.js APIs to build
                            cohesive end-to-end applications.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-start gap-space-md">
                        <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0 group-hover:bg-secondary-container transition-colors">
                          <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary-container transition-colors text-[24px]">
                            rocket_launch
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                            Applied Passion
                          </span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                            What I Enjoy Building
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                            Focused on pragmatic campus utilities, student productivity enhancers,
                            responsive web dashboards, and community marketplaces that eliminate
                            friction in everyday Nigerian university workflows.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-start gap-space-md">
                        <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center shrink-0 group-hover:bg-tertiary-container transition-colors">
                          <span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary-container transition-colors text-[24px]">
                            flag
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
                            Future Direction
                          </span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                            My Career Goal
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                            Securing internship and software engineering roles within
                            high-performance teams across Nigerian and global tech/fintech
                            ecosystems where I can contribute actively and elevate my craftsmanship.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED PROJECTS */}
            <section
              className="w-full py-space-xl lg:py-24 bg-surface-container-low"
              id="featured-projects"
            >
              <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-xl">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary-fixed/50 font-label-sm text-label-sm text-primary font-bold mb-space-xs">
                      <span className="material-symbols-outlined text-[16px]">folder_special</span>
                      <span>Portfolio Highlights</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
                      Projects That Bring Ideas to Life
                    </h2>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    A selection of real-world conceptual software designed with an emphasis on
                    clarity, operational utility, and human interaction.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  {/* Project 1: Student Productivity App */}
                  <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    <div
                      onClick={() => openProject("productivity", "demo")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openProject("productivity", "demo");
                      }}
                      className="relative w-full h-48 bg-gradient-to-br from-primary-fixed to-surface-container-high p-4 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-surface-container-lowest/90 text-primary">
                          v1.2.0 • ACADEMIC TOOL
                        </span>
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          timer
                        </span>
                      </div>
                      <div className="bg-surface-container-lowest/95 rounded-lg p-3 shadow-md backdrop-blur-sm -mb-8 transition-transform group-hover:-translate-y-2 duration-300">
                        <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container-lowest">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">
                            Pomodoro &amp; Deadline Tracker
                          </span>
                          <span className="w-2 h-2 rounded-full bg-primary-container" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 rounded-full bg-primary-fixed w-3/4" />
                          <div className="h-2 rounded-full bg-surface-container w-1/2" />
                        </div>
                      </div>
                    </div>

                    <div className="p-space-lg flex-1 flex flex-col justify-between pt-space-xl">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-space-xs">
                          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                            UI Design
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                            JavaScript
                          </span>
                          <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
                            Productivity
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                          Student Productivity App
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                          A focused academic task management tool featuring semester milestone
                          tracking, assignment countdowns, and customizable Pomodoro study cycles
                          tailored for Nigerian university schedules.
                        </p>
                      </div>
                      <div className="pt-space-md mt-space-md flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => openProject("productivity", "case-study")}
                          className="font-label-md text-label-md text-primary font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>View Case Study</span>
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </button>
                        <button
                          type="button"
                          title="Inspect Architecture & Code"
                          onClick={() => openProject("productivity", "architecture")}
                          className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">code</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Project 2: Personal Finance Dashboard */}
                  <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    <div
                      onClick={() => openProject("finance", "demo")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openProject("finance", "demo");
                      }}
                      className="relative w-full h-48 bg-gradient-to-br from-secondary-fixed to-surface-container-high p-4 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-surface-container-lowest/90 text-secondary">
                          FINANCE MATRIX
                        </span>
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          query_stats
                        </span>
                      </div>
                      <div className="bg-surface-container-lowest/95 rounded-lg p-3 shadow-md backdrop-blur-sm -mb-8 transition-transform group-hover:-translate-y-2 duration-300">
                        <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container-lowest">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">
                            Monthly Net Flow
                          </span>
                          <span className="text-[11px] font-bold text-secondary font-mono">
                            +18.4%
                          </span>
                        </div>
                        <div className="flex items-end gap-1.5 h-8 pt-1">
                          <div className="w-full bg-secondary-fixed-dim h-4 rounded-t" />
                          <div className="w-full bg-secondary-container h-7 rounded-t" />
                          <div className="w-full bg-secondary h-8 rounded-t" />
                          <div className="w-full bg-secondary-fixed h-5 rounded-t" />
                        </div>
                      </div>
                    </div>

                    <div className="p-space-lg flex-1 flex flex-col justify-between pt-space-xl">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-space-xs">
                          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                            React
                          </span>
                          <span className="px-2 py-0.5 rounded bg-secondary-fixed text-secondary font-label-sm text-label-sm font-semibold">
                            Data Visualization
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                            Responsive
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-secondary transition-colors">
                          Personal Finance Dashboard
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                          Data-driven financial utility analyzing cash flow, expense categorisation,
                          and goal tracking. Built with component reusability and responsive visual
                          charts in mind.
                        </p>
                      </div>
                      <div className="pt-space-md mt-space-md flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => openProject("finance", "case-study")}
                          className="font-label-md text-label-md text-secondary font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>View Case Study</span>
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </button>
                        <button
                          type="button"
                          title="Launch Interactive Demo"
                          onClick={() => openProject("finance", "demo")}
                          className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">launch</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Project 3: Campus Marketplace */}
                  <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    <div
                      onClick={() => openProject("marketplace", "demo")}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openProject("marketplace", "demo");
                      }}
                      className="relative w-full h-48 bg-gradient-to-br from-tertiary-fixed to-surface-container-high p-4 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-surface-container-lowest/90 text-tertiary">
                          P2P EXCHANGE
                        </span>
                        <span className="material-symbols-outlined text-tertiary text-[20px]">
                          storefront
                        </span>
                      </div>
                      <div className="bg-surface-container-lowest/95 rounded-lg p-3 shadow-md backdrop-blur-sm -mb-8 transition-transform group-hover:-translate-y-2 duration-300">
                        <div className="flex items-center justify-between pb-2 mb-2 bg-surface-container-lowest">
                          <span className="font-label-sm text-label-sm font-bold text-on-surface">
                            COOU Peer Marketplace
                          </span>
                          <span className="text-[11px] font-bold text-tertiary">Verified</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded bg-tertiary-fixed flex items-center justify-center text-tertiary text-[12px] font-bold">
                            B.Sc
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="h-2 rounded-full bg-tertiary-fixed-dim w-4/5" />
                            <div className="h-2 rounded-full bg-surface-container w-3/5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-space-lg flex-1 flex flex-col justify-between pt-space-xl">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-space-xs">
                          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                            Web Dev
                          </span>
                          <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-semibold">
                            UX Research
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                            Prototyping
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-tertiary transition-colors">
                          Campus Marketplace
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                          A localized peer-to-peer textbook and student essentials exchange created
                          for Chukwuemeka Odumegwu Ojukwu University students to securely trade
                          course literature and gear.
                        </p>
                      </div>
                      <div className="pt-space-md mt-space-md flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => openProject("marketplace", "case-study")}
                          className="font-label-md text-label-md text-tertiary font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>View Case Study</span>
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </button>
                        <button
                          type="button"
                          title="Preview Interactive Prototype"
                          onClick={() => openProject("marketplace", "demo")}
                          className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">preview</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MY SKILLS & TOOLKIT */}
            <section className="w-full py-space-xl lg:py-24">
              <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Competency Matrix
                  </span>
                  <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface mt-1">
                    My Skills &amp; Toolkit
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                    Transparent evaluation of hands-on tools, frameworks, design processes, and
                    professional business capabilities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  {/* Column 1: Development */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center gap-space-sm pb-space-sm bg-surface-container-lowest">
                      <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">terminal</span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Development
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Front-End &amp; Core Logic
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          HTML &amp; Semantic Web
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-fixed text-primary">
                          Proficient
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          CSS3 &amp; Tailwind CSS
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-container text-on-primary">
                          Advanced
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          JavaScript ES6+
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-fixed text-primary">
                          Proficient
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          React &amp; Components
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-fixed text-primary">
                          Proficient
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Python
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface">
                          Academic Core
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Git Version Control
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-fixed text-primary">
                          Workflow
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Design */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center gap-space-sm pb-space-sm bg-surface-container-lowest">
                      <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined">draw</span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Design &amp; UX
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Interface &amp; Layout Systems
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Figma UI / Design System
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-secondary-container text-on-secondary-container">
                          Advanced
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Wireframing &amp; Sitemaps
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-secondary-fixed text-secondary">
                          Proficient
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Interactive Prototyping
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-secondary-fixed text-secondary">
                          Proficient
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Responsive Layouts
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-secondary-container text-on-secondary-container">
                          Specialist
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          UI Accessibility Standards
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface">
                          Standard
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Professional & Strategy */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center gap-space-sm pb-space-sm bg-surface-container-lowest">
                      <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined">analytics</span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          Strategy &amp; Soft Skills
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Business &amp; Communication
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Analytical Problem Solving
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-tertiary">
                          Core Strength
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Technical Communication
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-tertiary">
                          Effective
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Cross-Functional Synergy
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-tertiary">
                          Team Player
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Project Delivery Timelines
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-tertiary-fixed text-tertiary">
                          Disciplined
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Organizational Strategy
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface">
                          B.Sc Focus
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* LEARNING JOURNEY TIMELINE */}
            <section className="w-full py-space-xl lg:py-24 bg-surface-container-low">
              <div className="max-w-4xl mx-auto px-margin-mobile lg:px-margin-desktop">
                <div className="text-center mb-space-xl">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Chronology
                  </span>
                  <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface mt-1">
                    My Journey So Far
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-space-xs">
                    An ongoing evolution of continuous learning, foundational academic study, and
                    tangible software craft.
                  </p>
                </div>

                <div className="relative pl-6 md:pl-8 space-y-12">
                  <div className="absolute top-2 bottom-2 left-2 md:left-2.5 w-0.5 bg-surface-container-highest" />

                  <div className="relative group">
                    <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-outline group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm">
                      <span className="px-2.5 py-0.5 rounded font-mono text-[12px] font-bold bg-surface-container text-on-surface-variant">
                        2022 — 2023
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">
                        First Lines of Code &amp; Foundations
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Discovered a passion for programming. Immersed in foundational semantic
                        HTML5, CSS responsive layouts, and vanilla JavaScript fundamentals, building
                        static personal tools and experiments.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm">
                      <span className="px-2.5 py-0.5 rounded font-mono text-[12px] font-bold bg-secondary-fixed text-secondary">
                        2023 — 2024
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">
                        Academic Growth at COOU Igbariam
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Commenced intensive B.Sc. studies in Business Administration under the
                        Faculty of Management Sciences. Synthesized business analysis, management
                        information workflows, and programmatic problem solving.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-tertiary-container group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm">
                      <span className="px-2.5 py-0.5 rounded font-mono text-[12px] font-bold bg-tertiary-fixed text-tertiary">
                        2024
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2">
                        Interactive Applications &amp; UI/UX
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        Transitioned to single-page applications using React, modern component
                        architecture, and advanced Figma prototyping. Engineered pragmatic web
                        utilities for student productivity.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[27px] md:-left-[29px] top-1.5 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm ring-4 ring-primary/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
                    </div>
                    <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm ring-1 ring-primary/10">
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
                        Ready to bring energy, high-velocity learning, and business-grounded
                        frontend engineering to developer internships, contract builds, and
                        forward-thinking collaborative tech teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACT & ENGAGEMENT SECTION */}
            <section className="w-full py-space-xl lg:py-24" id="contact">
              <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12">
                  <div className="lg:col-span-5 flex flex-col justify-between gap-space-lg">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary-fixed/50 font-label-sm text-label-sm text-primary font-bold mb-space-xs">
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span>Get In Touch</span>
                      </div>
                      <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
                        Have an Opportunity or Project in Mind?
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                        I&apos;m always interested in learning, collaborating, and building
                        something meaningful. Whether it&apos;s an internship, software project, or
                        tech dialogue, my inbox is open.
                      </p>
                    </div>

                    <div className="flex flex-col gap-space-sm">
                      <a
                        className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors group"
                        href={`mailto:${CONTACT_INFO.email}`}
                      >
                        <div className="flex items-center gap-space-sm min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                            <span className="material-symbols-outlined">mail</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-label-sm text-label-sm text-outline">
                              Email Address
                            </div>
                            <div className="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors truncate">
                              {CONTACT_INFO.email}
                            </div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
                          arrow_outward
                        </span>
                      </a>

                      <a
                        className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors group"
                        href={CONTACT_INFO.linkedinUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <div className="flex items-center gap-space-sm min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                            <span className="material-symbols-outlined">share</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-label-sm text-label-sm text-outline">
                              LinkedIn Profile
                            </div>
                            <div className="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors truncate">
                              {CONTACT_INFO.linkedinHandle}
                            </div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">
                          arrow_outward
                        </span>
                      </a>

                      <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                            <span className="material-symbols-outlined">location_on</span>
                          </div>
                          <div>
                            <div className="font-label-sm text-label-sm text-outline">Location</div>
                            <div className="font-label-md text-label-md text-on-surface font-bold">
                              {CONTACT_INFO.location}
                            </div>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline-variant shrink-0">
                          public
                        </span>
                      </div>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container text-on-surface-variant flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[24px] shrink-0">
                        verified_user
                      </span>
                      <p className="font-body-sm text-body-sm leading-snug">
                        Chukwuemeka Odumegwu Ojukwu University • Faculty of Management Sciences
                      </p>
                    </div>
                  </div>

                  {/* Interactive Direct Message Form */}
                  <div className="lg:col-span-7 bg-surface-container-low p-space-md sm:p-space-xl rounded-2xl shadow-sm">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                      Send a Message
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                      Fill out this brief form and I will get back to you promptly.
                    </p>
                    <form
                      className="flex flex-col gap-space-md"
                      onSubmit={handleHomeContactSubmit}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-sm text-label-sm text-on-surface font-semibold"
                            htmlFor="contact-name"
                          >
                            Full Name
                          </label>
                          <input
                            className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                            id="contact-name"
                            value={contactName}
                            onChange={(e) => {
                              setContactName(e.target.value);
                              if (submitState === "sent") setSubmitState("idle");
                            }}
                            placeholder="e.g. David Eze"
                            required
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            className="font-label-sm text-label-sm text-on-surface font-semibold"
                            htmlFor="contact-email"
                          >
                            Email Address
                          </label>
                          <input
                            className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                            id="contact-email"
                            value={contactEmail}
                            onChange={(e) => {
                              setContactEmail(e.target.value);
                              if (submitState === "sent") setSubmitState("idle");
                            }}
                            placeholder="e.g. david@example.com"
                            required
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-label-sm text-label-sm text-on-surface font-semibold"
                          htmlFor="contact-subject"
                        >
                          Subject / Opportunity Type
                        </label>
                        <select
                          className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                          id="contact-subject"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                        >
                          <option value="internship">Internship Opportunity</option>
                          <option value="project">Web Development Project</option>
                          <option value="collaboration">Collaborative Venture</option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-label-sm text-label-sm text-on-surface font-semibold"
                          htmlFor="contact-message"
                        >
                          Message
                        </label>
                        <textarea
                          className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                          id="contact-message"
                          value={contactMessage}
                          onChange={(e) => {
                            setContactMessage(e.target.value);
                            if (submitState === "sent") setSubmitState("idle");
                          }}
                          placeholder="Tell me about your team, project requirements, or idea..."
                          required
                          rows={4}
                        />
                      </div>

                      <button
                        disabled={submitState === "sending"}
                        className={`w-full py-3 px-space-lg rounded-lg text-on-primary font-label-md text-label-md font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          submitState === "sent"
                            ? "bg-tertiary-container hover:bg-tertiary"
                            : "bg-primary-container hover:bg-primary"
                        }`}
                        type="submit"
                      >
                        {submitState === "sending" && (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">
                              refresh
                            </span>
                            <span>Sending...</span>
                          </>
                        )}
                        {submitState === "sent" && (
                          <>
                            <span className="material-symbols-outlined text-[18px]">done</span>
                            <span>Sent Successfully</span>
                          </>
                        )}
                        {submitState === "idle" && (
                          <>
                            <span className="material-symbols-outlined text-[18px]">send</span>
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      {submitState === "sent" && (
                        <div className="p-space-md rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center gap-space-xs font-body-sm text-body-sm">
                          <span className="material-symbols-outlined text-[20px] text-secondary">
                            check_circle
                          </span>
                          <span>Thank you! Your message has been noted. I will reach out soon.</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer activeScreen={activeScreen} onNavigate={navigateScreen} />
    </div>
  );
}
