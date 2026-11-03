import React, { useEffect, useState } from "react";
import { Header, NavSection } from "./components/Header";
import { Footer } from "./components/Footer";
import { SafeImage } from "./components/SafeImage";
import { ProjectScreen } from "./components/ProjectScreen";
import { ResumeScreen } from "./components/ResumeScreen";
import { HERO_PORTRAIT_URL, ProjectId, ProjectTab } from "./data/portfolioData";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<"home" | "project" | "resume">("home");
  const [activeSection, setActiveSection] = useState<NavSection>("hero");
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectId>("productivity");
  const [selectedProjectTab, setSelectedProjectTab] = useState<ProjectTab>("case-study");
  const [codeTab, setCodeTab] = useState<"config" | "stack">("config");

  // Contact form state
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [opportunityType, setOpportunityType] = useState("internship");
  const [messageContent, setMessageContent] = useState("");
  const [submittedInfo, setSubmittedInfo] = useState<{
    name: string;
    email: string;
    type: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll-spy for home sections
  useEffect(() => {
    if (activeScreen !== "home") return;

    const sectionIds: NavSection[] = ["hero", "skills", "about", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as NavSection);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeScreen]);

  const navigateToSection = (section: NavSection) => {
    if (activeScreen !== "home") {
      setActiveScreen("home");
      setActiveSection(section);
      window.setTimeout(() => {
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 60);
    } else {
      setActiveSection(section);
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openProject = (id: ProjectId, tab: ProjectTab = "case-study") => {
    setSelectedProjectId(id);
    setSelectedProjectTab(tab);
    setActiveScreen("project");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openResume = () => {
    setActiveScreen("resume");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText("chibuike.david@example.com");
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedInfo({
      name: fullName.trim(),
      email: emailAddress.trim(),
      type: opportunityType,
    });
    setFullName("");
    setEmailAddress("");
    setOpportunityType("internship");
    setMessageContent("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface">
      <Header
        activeScreen={activeScreen}
        activeSection={activeSection}
        onNavigateSection={navigateToSection}
        onOpenResume={openResume}
      />

      <main className="w-full pt-16 bg-surface flex-1 min-h-[calc(100vh-4rem)]">
        {activeScreen === "project" && (
          <ProjectScreen
            projectId={selectedProjectId}
            activeTab={selectedProjectTab}
            onSelectProject={(id, tab) => openProject(id, tab || "case-study")}
            onChangeTab={setSelectedProjectTab}
            onBackToPortfolio={() => navigateToSection("projects")}
            onContactForProject={() => navigateToSection("contact")}
          />
        )}

        {activeScreen === "resume" && (
          <ResumeScreen
            onBackToPortfolio={() => navigateToSection("hero")}
            onOpenProject={(id) => openProject(id, "case-study")}
            onContact={() => navigateToSection("contact")}
          />
        )}

        {activeScreen === "home" && (
          <div className="flex flex-col w-full">
            {/* Top Ambient Glow + 1. HERO SECTION */}
            <div className="relative w-full overflow-hidden">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-container/20 rounded-full blur-[130px] pointer-events-none" />
              <div className="absolute top-20 right-10 w-[400px] h-[300px] bg-secondary-container/15 rounded-full blur-[110px] pointer-events-none" />

              <section
                className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24"
                id="hero"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  {/* Left Column: Bio & CTA */}
                  <div className="lg:col-span-7 flex flex-col items-start z-10">
                    {/* Availability Indicator */}
                    <button
                      type="button"
                      onClick={() => navigateToSection("contact")}
                      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest backdrop-blur-md shadow-sm mb-6 transition-colors cursor-pointer"
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.9)]" />
                      </span>
                      <span className="font-label-md text-label-md text-secondary font-medium tracking-wide">
                        Open to Internships &amp; Opportunities
                      </span>
                    </button>

                    {/* Main Headline with Gradient */}
                    <h1 className="font-display text-display-mobile sm:text-display lg:text-[3.5rem] tracking-tight text-on-surface font-bold leading-[1.12] mb-4">
                      Hi, I&apos;m Ifediora Chibuike David. <br className="hidden sm:inline" />I
                      Build{" "}
                      <span className="bg-gradient-to-r from-secondary via-primary to-primary-container bg-clip-text text-transparent">
                        Digital Experiences.
                      </span>
                    </h1>

                    {/* University Subtitle */}
                    <p className="font-headline-sm text-headline-sm text-secondary font-medium tracking-tight mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        school
                      </span>
                      <span>Computer Science Student at COOU Igbariam</span>
                    </p>

                    {/* Supporting Narrative */}
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                      I&apos;m a tech enthusiast and aspiring Full-Stack Developer &amp; UI/UX
                      Designer passionate about solving real-world problems through technology,
                      thoughtful design, and continuous learning.
                    </p>

                    {/* Primary CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
                      <a
                        href="#projects"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToSection("projects");
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold tracking-wide shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:bg-inverse-primary hover:shadow-[0_0_32px_rgba(123,208,255,0.5)] transition-all duration-200 whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                        <span>Explore My Projects</span>
                      </a>
                      <button
                        type="button"
                        onClick={openResume}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-medium tracking-wide shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        <span>Download My CV</span>
                      </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4 text-on-surface-variant">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                        Connect:
                      </span>
                      <a
                        aria-label="GitHub"
                        className="h-10 w-10 rounded-lg bg-surface-container flex items-center justify-center hover:text-secondary hover:bg-surface-container-highest transition-colors shadow-sm"
                        href="https://github.com"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[20px]">code</span>
                      </a>
                      <a
                        aria-label="LinkedIn"
                        className="h-10 w-10 rounded-lg bg-surface-container flex items-center justify-center hover:text-secondary hover:bg-surface-container-highest transition-colors shadow-sm"
                        href="https://linkedin.com"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[20px]">hub</span>
                      </a>
                      <a
                        aria-label="Twitter"
                        className="h-10 w-10 rounded-lg bg-surface-container flex items-center justify-center hover:text-secondary hover:bg-surface-container-highest transition-colors shadow-sm"
                        href="https://twitter.com"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[20px]">tag</span>
                      </a>
                      <a
                        aria-label="Email"
                        className="h-10 w-10 rounded-lg bg-surface-container flex items-center justify-center hover:text-secondary hover:bg-surface-container-highest transition-colors shadow-sm"
                        href="mailto:chibuike.david@example.com"
                      >
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Student Image & Code Overlay */}
                  <div className="lg:col-span-5 relative flex justify-center lg:justify-end pb-6 lg:pb-0">
                    <div className="relative w-full max-w-[380px] lg:max-w-[420px]">
                      {/* Decorative Accent Behind */}
                      <div className="absolute -inset-2 bg-gradient-to-tr from-primary-container/30 to-secondary/30 rounded-3xl blur-xl opacity-60" />

                      {/* Student Photo Frame */}
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container">
                        <SafeImage
                          src={HERO_PORTRAIT_URL}
                          alt="Ifediora Chibuike David - Computer Science Student at COOU Igbariam"
                          fallbackInitials="ICD"
                          className="w-full h-[440px] object-cover object-center saturate-[1.08] contrast-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-50 pointer-events-none" />
                      </div>

                      {/* Floating Tech Callouts */}
                      <button
                        type="button"
                        onClick={() => navigateToSection("skills")}
                        className="absolute -top-3 -left-4 px-3.5 py-1.5 rounded-full bg-surface-container-highest/90 hover:bg-surface-container-highest backdrop-blur-md shadow-lg flex items-center gap-1.5 text-secondary font-label-md text-label-md font-medium transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <span>⚡</span>
                        <span>React &amp; TypeScript</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openProject("marketplace", "demo")}
                        className="absolute top-24 -right-4 px-3.5 py-1.5 rounded-full bg-surface-container-highest/90 hover:bg-surface-container-highest backdrop-blur-md shadow-lg flex items-center gap-1.5 text-tertiary font-label-md text-label-md font-medium transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <span>🎨</span>
                        <span>Figma to Code</span>
                      </button>

                      {/* Floating Code Editor Card */}
                      <div className="absolute -bottom-8 -left-4 sm:-left-10 right-4 sm:right-auto sm:w-[350px] bg-surface-container-lowest/95 backdrop-blur-xl rounded-xl shadow-2xl p-4 font-code-inline text-code-inline border border-outline-variant/20">
                        {/* Window Bar */}
                        <div className="flex items-center justify-between pb-3 mb-2.5 bg-surface-container-low/40 px-2 py-1 rounded-lg">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-error" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#facc15]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setCodeTab((prev) => (prev === "config" ? "stack" : "config"))
                            }
                            title="Switch code file preview"
                            className="font-label-sm text-label-sm text-outline hover:text-secondary transition-colors cursor-pointer"
                          >
                            {codeTab === "config" ? "developer.config.ts" : "coou.profile.ts"}
                          </button>
                          <button
                            type="button"
                            aria-label="Toggle code snippet"
                            onClick={() =>
                              setCodeTab((prev) => (prev === "config" ? "stack" : "config"))
                            }
                            className="text-outline hover:text-secondary transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">terminal</span>
                          </button>
                        </div>

                        {/* Code Lines */}
                        {codeTab === "config" ? (
                          <div className="space-y-1 text-[13px] leading-relaxed select-none">
                            <div>
                              <span className="text-secondary">const</span>{" "}
                              <span className="text-primary">student</span> = {"{"}
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">name:</span>{" "}
                              <span className="text-[#86efac]">
                                &quot;Ifediora Chibuike David&quot;
                              </span>
                              ,
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">institution:</span>{" "}
                              <span className="text-[#86efac]">&quot;COOU Igbariam&quot;</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">focus:</span> [
                              <span className="text-secondary">&quot;Frontend&quot;</span>,{" "}
                              <span className="text-secondary">&quot;UI/UX&quot;</span>,{" "}
                              <span className="text-secondary">&quot;Python&quot;</span>],
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">status:</span>{" "}
                              <span className="text-tertiary">
                                &quot;Ready for Internships &amp; Projects&quot;
                              </span>{" "}
                              🚀
                            </div>
                            <div>{"};"}</div>
                          </div>
                        ) : (
                          <div className="space-y-1 text-[13px] leading-relaxed select-none">
                            <div>
                              <span className="text-secondary">export const</span>{" "}
                              <span className="text-primary">academics</span> = {"{"}
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">degree:</span>{" "}
                              <span className="text-[#86efac]">&quot;B.Sc Computer Science&quot;</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">campus:</span>{" "}
                              <span className="text-[#86efac]">&quot;Anambra, Nigeria&quot;</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">shippedApps:</span>{" "}
                              <span className="text-secondary">5</span>,
                            </div>
                            <div className="pl-4">
                              <span className="text-outline">availability:</span>{" "}
                              <span className="text-tertiary">&quot;Summer 2025 Roles&quot;</span>
                            </div>
                            <div>{"};"}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 2. TECHNOLOGIES I WORK WITH */}
            <section className="w-full py-16 bg-surface-container-lowest" id="skills">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-medium">
                      Core Tech Stack
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight mt-1">
                      Technologies I Work With
                    </h2>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                    A focused developer toolchain centered on modern web technologies, scripting
                    fundamentals, and human-centered design.
                  </p>
                </div>

                {/* Tech Stack Grid by Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Frontend */}
                  <div className="bg-surface-container rounded-2xl p-6 shadow-md hover:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="h-9 w-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">web</span>
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Frontend
                        </h3>
                        <p className="font-label-sm text-label-sm text-outline">
                          Interactive UI &amp; Web Standards
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm">
                        <span className="font-label-md text-label-md text-tertiary">#</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          HTML5
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm">
                        <span className="font-label-md text-label-md text-secondary">#</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          CSS3
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm">
                        <span className="font-label-md text-label-md text-[#facc15]">JS</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          JavaScript ES6+
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm">
                        <span className="font-label-md text-label-md text-secondary">⚛</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          React
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Backend & Scripting */}
                  <div className="bg-surface-container rounded-2xl p-6 shadow-md hover:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="h-9 w-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">data_object</span>
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Backend &amp; Scripting
                        </h3>
                        <p className="font-label-sm text-label-sm text-outline">
                          Logic, Services &amp; APIs
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm col-span-2 sm:col-span-1">
                        <span className="font-label-md text-label-md text-secondary">🐍</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Python
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm col-span-2 sm:col-span-1">
                        <span className="font-label-md text-label-md text-[#86efac]">🟢</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Node.js <span className="text-outline text-xs">(Learning)</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm col-span-2">
                        <span className="font-label-md text-label-md text-primary">⚡</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          RESTful API Integration
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tools & Workflow */}
                  <div className="bg-surface-container rounded-2xl p-6 shadow-md hover:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="h-9 w-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[20px]">construction</span>
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Tools &amp; Workflow
                        </h3>
                        <p className="font-label-sm text-label-sm text-outline">
                          Design &amp; Developer Tooling
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm">
                        <span className="font-label-md text-label-md text-tertiary">🐙</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Git &amp; GitHub
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm">
                        <span className="font-label-md text-label-md text-secondary">💻</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          VS Code
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low shadow-sm col-span-2">
                        <span className="font-label-md text-label-md text-[#f472b6]">🎨</span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          Figma UI / Prototyping
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. ABOUT ME SECTION */}
            <section className="w-full py-20 bg-surface" id="about">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Top Overview Card with University Stamp */}
                <div className="bg-surface-container-low rounded-3xl p-8 lg:p-12 mb-10 shadow-xl relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest text-secondary font-label-md text-label-md font-medium mb-4">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      <span>A Little About Me</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-4">
                      About Me
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-6">
                      I&apos;m a motivated university student at Chukwuemeka Odumegwu Ojukwu
                      University (COOU) Igbariam building practical software and design skills. I
                      love turning complex problems into intuitive digital solutions and thrive on
                      hands-on project building.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 pt-2 font-label-md text-label-md text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          location_on
                        </span>
                        <span>Anambra State, Nigeria</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          menu_book
                        </span>
                        <span>B.Sc Computer Science Student</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          verified
                        </span>
                        <span>COOU Igbariam Scholar</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Informative Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-container rounded-2xl p-7 flex flex-col justify-between shadow-md hover:bg-surface-container-high transition-all">
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[26px]">psychology</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-3">
                        Currently Learning
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Deep diving into advanced React state management, Next.js application
                        architecture, asynchronous programming, and RESTful API integrations.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center gap-2 text-secondary font-label-md text-label-md">
                      <span>Next milestone: Full-Stack microservices</span>
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    </div>
                  </div>

                  <div className="bg-surface-container rounded-2xl p-7 flex flex-col justify-between shadow-md hover:bg-surface-container-high transition-all">
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[26px]">devices</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-3">
                        What I Enjoy Building
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Interactive web apps, real-world student utility tools, responsive digital
                        interfaces, and accessible design systems crafted with high precision.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center gap-2 text-secondary font-label-md text-label-md">
                      <span>Focus: Speed, aesthetics &amp; UX</span>
                      <span className="material-symbols-outlined text-[16px]">speed</span>
                    </div>
                  </div>

                  <div className="bg-surface-container rounded-2xl p-7 flex flex-col justify-between shadow-md hover:bg-surface-container-high transition-all">
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[26px]">flag</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-3">
                        My Career Goal
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Securing software engineering internships, collaborating on innovative
                        global engineering teams, and creating impactful technology for emerging
                        African markets.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToSection("contact")}
                      className="mt-6 pt-4 flex items-center gap-2 text-tertiary hover:text-on-surface font-label-md text-label-md transition-colors cursor-pointer w-fit"
                    >
                      <span>Ready for summer 2025 roles</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. FEATURED PROJECTS SECTION */}
            <section className="w-full py-20 bg-surface-container-lowest" id="projects">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-medium">
                      Featured Work
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
                      Projects That Bring Ideas to Life
                    </h2>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                    A showcase of practical web applications and digital interfaces built with
                    modern developer workflows.
                  </p>
                </div>

                {/* 3-Card Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Project 1: Student Productivity App */}
                  <div className="bg-surface-container rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group hover:bg-surface-container-high transition-all duration-300">
                    <div>
                      <div
                        onClick={() => openProject("productivity", "demo")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            openProject("productivity", "demo");
                        }}
                        className="bg-surface-container-low p-5 relative overflow-hidden h-56 flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-secondary font-medium">
                            Academic Suite v1.2
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-outline">
                            timer
                          </span>
                        </div>

                        <div className="bg-surface-container-highest/90 rounded-xl p-3.5 shadow-md space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-secondary" />
                              <span className="font-label-md text-label-md text-on-surface font-semibold">
                                CMP 312: Algorithms
                              </span>
                            </div>
                            <span className="font-code-inline text-[11px] text-tertiary bg-surface-container-low px-2 py-0.5 rounded">
                              24:15 Pomodoro
                            </span>
                          </div>
                          <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                            <div className="bg-secondary h-full rounded-full w-3/4" />
                          </div>
                          <div className="flex justify-between text-[11px] font-label-sm text-on-surface-variant">
                            <span>3 tasks remaining</span>
                            <span>75% daily goal</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                            COOU Timetable
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                            Assignment Queue
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-2 group-hover:text-primary transition-colors">
                          Student Productivity App
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                          A comprehensive web app helping university students organize academic
                          schedules, assignment deadlines, and focused study sessions with Pomodoro
                          integration.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {["UI Design", "JavaScript", "LocalStorage", "Tailwind CSS"].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="font-code-inline text-[12px] px-2.5 py-1 rounded-md bg-surface-container-low text-secondary font-medium"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openProject("productivity", "case-study")}
                        className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors font-medium cursor-pointer"
                      >
                        <span>View Case Study</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openProject("productivity", "architecture")}
                        className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">code</span>
                        <span>GitHub Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Project 2: Personal Finance Dashboard */}
                  <div className="bg-surface-container rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group hover:bg-surface-container-high transition-all duration-300">
                    <div>
                      <div
                        onClick={() => openProject("finance", "demo")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") openProject("finance", "demo");
                        }}
                        className="bg-surface-container-low p-5 relative overflow-hidden h-56 flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-secondary font-medium">
                            Finance Tracker OS
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-outline">
                            analytics
                          </span>
                        </div>

                        <div className="bg-surface-container-highest/90 rounded-xl p-3.5 shadow-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                              Monthly Budget Flow
                            </span>
                            <span className="font-code-inline text-[11px] text-secondary font-semibold">
                              +18.4% saved
                            </span>
                          </div>
                          <svg
                            className="w-full h-12 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 200 48"
                          >
                            <path
                              className="text-secondary"
                              d="M0 40 L30 35 L60 22 L90 28 L120 12 L150 18 L180 8 L200 14"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                            />
                            <path
                              d="M0 40 L30 35 L60 22 L90 28 L120 12 L150 18 L180 8 L200 14 L200 48 L0 48 Z"
                              fill="currentColor"
                              opacity="0.12"
                            />
                          </svg>
                          <div className="flex justify-between items-center mt-2 text-[10px] font-label-sm text-outline">
                            <span>Allowance: ₦45,000</span>
                            <span>Savings: ₦12,500</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                            Expense Breakdown
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                            Target Goals
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-2 group-hover:text-primary transition-colors">
                          Personal Finance Dashboard
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                          A modern analytics concept empowering young adults to visualize spending
                          patterns, track monthly allowance budgets, and set savings targets.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {[
                            "React",
                            "Data Visualisation",
                            "Chart.js",
                            "Responsive Design",
                          ].map((tag) => (
                            <span
                              key={tag}
                              className="font-code-inline text-[12px] px-2.5 py-1 rounded-md bg-surface-container-low text-secondary font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openProject("finance", "case-study")}
                        className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors font-medium cursor-pointer"
                      >
                        <span>View Case Study</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openProject("finance", "demo")}
                        className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>Live Demo</span>
                      </button>
                    </div>
                  </div>

                  {/* Project 3: Campus Marketplace */}
                  <div className="bg-surface-container rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group hover:bg-surface-container-high transition-all duration-300">
                    <div>
                      <div
                        onClick={() => openProject("marketplace", "demo")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            openProject("marketplace", "demo");
                        }}
                        className="bg-surface-container-low p-5 relative overflow-hidden h-56 flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-secondary font-medium">
                            Peer Commerce P2P
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-outline">
                            shopping_bag
                          </span>
                        </div>

                        <div className="bg-surface-container-highest/90 rounded-xl p-3 shadow-md space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="h-6 w-6 rounded-full bg-secondary-container/40 flex items-center justify-center text-[10px] text-secondary font-bold">
                                CO
                              </span>
                              <div>
                                <div className="text-[12px] font-semibold text-on-surface">
                                  Data Structures &amp; Alg. in C++
                                </div>
                                <div className="text-[10px] text-outline">
                                  Seller: Faculty of Physical Sciences
                                </div>
                              </div>
                            </div>
                            <span className="text-[11px] font-code-inline font-bold text-secondary">
                              ₦3,500
                            </span>
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/20 text-primary text-[10px] font-label-sm">
                              <span className="material-symbols-outlined text-[12px]">
                                verified
                              </span>
                              Verified Student
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant text-[10px] font-label-sm">
                              <span className="material-symbols-outlined text-[12px]">near_me</span>
                              Igbariam Campus
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                            Escrow Security
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant">
                            Instant Chat
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-2 group-hover:text-primary transition-colors">
                          Campus Marketplace
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                          A student-centric peer-to-peer exchange platform for buying, selling, and
                          swapping textbooks, electronics, and campus essentials safely.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {["Web Development", "UX Research", "Prototyping", "Figma"].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="font-code-inline text-[12px] px-2.5 py-1 rounded-md bg-surface-container-low text-secondary font-medium"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openProject("marketplace", "case-study")}
                        className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors font-medium cursor-pointer"
                      >
                        <span>View Case Study</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openProject("marketplace", "demo")}
                        className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        <span>Prototype</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. SKILLS & STRENGTHS SECTION */}
            <section className="w-full py-20 bg-surface">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-medium">
                    Competencies
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
                    My Skills &amp; Toolkit
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-3">
                    Practical technical proficiencies and interpersonal strengths developed through
                    rigorous academic projects and self-guided engineering.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Column 1: Development */}
                  <div className="bg-surface-container-low rounded-2xl p-7 shadow-lg flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[22px]">code</span>
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Development
                        </h3>
                        <p className="font-label-sm text-label-sm text-outline">
                          Core programming stack
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {[
                        ["HTML5 & Semantic Web", "Proficient"],
                        ["CSS3 & Tailwind CSS", "Advanced"],
                        ["JavaScript (ES6+)", "Proficient"],
                        ["React & Component Arch", "Proficient"],
                        ["Python Programming", "Academic Core"],
                        ["Git Version Control", "Workflow"],
                      ].map(([skill, level]) => (
                        <div
                          key={skill}
                          className="flex items-center justify-between p-3 rounded-xl bg-surface-container shadow-sm"
                        >
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            {skill}
                          </span>
                          <span className="font-label-md text-label-md text-secondary">
                            {level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Design */}
                  <div className="bg-surface-container-low rounded-2xl p-7 shadow-lg flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[22px]">brush</span>
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Design
                        </h3>
                        <p className="font-label-sm text-label-sm text-outline">
                          User experience &amp; visual systems
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {[
                        ["Figma UI Workspace", "Advanced"],
                        ["Wireframing & Flowcharts", "Proficient"],
                        ["Rapid Interactive Prototyping", "Proficient"],
                        ["Responsive Layout Design", "Specialist"],
                        ["Design Systems & Tokens", "Practitioner"],
                        ["Accessibility & Contrast", "Standard"],
                      ].map(([skill, level]) => (
                        <div
                          key={skill}
                          className="flex items-center justify-between p-3 rounded-xl bg-surface-container shadow-sm"
                        >
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            {skill}
                          </span>
                          <span className="font-label-md text-label-md text-secondary">
                            {level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Professional & Soft Skills */}
                  <div className="bg-surface-container-low rounded-2xl p-7 shadow-lg flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[22px]">diversity_3</span>
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Professional
                        </h3>
                        <p className="font-label-sm text-label-sm text-outline">
                          Execution &amp; collaboration
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {[
                        ["Analytical Problem Solving", "Core Strength"],
                        ["Technical Communication", "Effective"],
                        ["Cross-Functional Collaboration", "Team Player"],
                        ["Curiosity & Continuous Learning", "Drive"],
                        ["Self-Directed Research", "Academic"],
                        ["Project Delivery Timelines", "Disciplined"],
                      ].map(([skill, level]) => (
                        <div
                          key={skill}
                          className="flex items-center justify-between p-3 rounded-xl bg-surface-container shadow-sm"
                        >
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            {skill}
                          </span>
                          <span className="font-label-md text-label-md text-tertiary">{level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. LEARNING JOURNEY TIMELINE */}
            <section className="w-full py-20 bg-surface-container-lowest">
              <div className="max-w-4xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-medium">
                    Milestones
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
                    My Journey So Far
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    From writing my first block of HTML to engineering reactive software and seeking
                    industry impact.
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-12">
                  {/* Connecting Vertical Background Line */}
                  <div className="absolute top-3 bottom-3 left-[15px] sm:left-[19px] w-0.5 bg-surface-container-highest" />

                  {/* Milestone 1 */}
                  <div className="relative flex items-start gap-6 group">
                    <div className="absolute -left-[23px] sm:-left-[27px] mt-1.5 h-4 w-4 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]" />
                    </div>
                    <div className="bg-surface-container rounded-2xl p-6 shadow-md w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          First Lines of Code &amp; Foundations
                        </h3>
                        <span className="font-label-md text-label-md text-secondary font-medium">
                          2022 – 2023
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Discovered programming, mastered core HTML/CSS semantic fundamentals,
                        learned responsive design patterns, and built early static landing pages and
                        portfolio drafts.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  <div className="relative flex items-start gap-6 group">
                    <div className="absolute -left-[23px] sm:-left-[27px] mt-1.5 h-4 w-4 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]" />
                    </div>
                    <div className="bg-surface-container rounded-2xl p-6 shadow-md w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Academic Growth at COOU Igbariam
                        </h3>
                        <span className="font-label-md text-label-md text-secondary font-medium">
                          2023 – 2024
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Commenced Computer Science degree at Chukwuemeka Odumegwu Ojukwu University.
                        Completed core algorithms, data structures coursework, discrete math, and
                        computer architecture modules with strong performance.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 3 */}
                  <div className="relative flex items-start gap-6 group">
                    <div className="absolute -left-[23px] sm:-left-[27px] mt-1.5 h-4 w-4 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]" />
                    </div>
                    <div className="bg-surface-container rounded-2xl p-6 shadow-md w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Interactive Applications &amp; UI/UX
                        </h3>
                        <span className="font-label-md text-label-md text-secondary font-medium">
                          2024
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Deepened JavaScript mastery, transitioned to building single-page
                        applications with React, adopted Figma for rapid wireframing and
                        prototyping, and shipped 5+ personal projects.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 4 */}
                  <div className="relative flex items-start gap-6 group">
                    <div className="absolute -left-[23px] sm:-left-[27px] mt-1.5 h-4 w-4 rounded-full bg-secondary/30 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-secondary animate-ping" />
                    </div>
                    <div className="bg-surface-container-high rounded-2xl p-6 shadow-xl w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            Seeking Opportunities &amp; Full-Stack Growth
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm">
                            Active
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-secondary font-medium">
                          Present
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Expanding full-stack capabilities with backend APIs and Next.js, actively
                        contributing to campus developer communities, and eager to secure software
                        engineering internships and collaborative junior roles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. CONTACT & GET IN TOUCH SECTION */}
            <section className="w-full py-20 bg-surface relative overflow-hidden" id="contact">
              <div className="absolute -bottom-20 left-1/3 w-[500px] h-[300px] bg-primary-container/15 rounded-full blur-[140px] pointer-events-none" />
              <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="max-w-2xl mb-14">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-medium">
                    Get in Touch
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
                    Have an Opportunity or Project in Mind?
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
                    I&apos;m always interested in learning, collaborating, and building something
                    meaningful. Let&apos;s connect.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left: Contact Details Card */}
                  <div className="lg:col-span-5 bg-surface-container-low rounded-3xl p-8 shadow-xl flex flex-col justify-between space-y-8">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
                        Let&apos;s build together
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-6">
                        Whether you are an engineering lead looking for an intern, a fellow student
                        with a startup idea, or an organization building tech solutions, my inbox is
                        open.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group">
                          <a
                            className="flex items-center gap-4 min-w-0"
                            href="mailto:chibuike.david@example.com"
                          >
                            <span className="h-10 w-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors shrink-0">
                              <span className="material-symbols-outlined text-[20px]">mail</span>
                            </span>
                            <div className="min-w-0">
                              <span className="font-label-sm text-label-sm text-outline uppercase">
                                Direct Email
                              </span>
                              <div className="font-body-md text-body-md text-on-surface font-medium truncate">
                                chibuike.david@example.com
                              </div>
                            </div>
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            title="Copy email address"
                            className="px-2.5 py-1 rounded-lg bg-surface-container-highest text-secondary font-label-sm text-label-sm hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer shrink-0"
                          >
                            {copiedEmail ? "Copied" : "Copy"}
                          </button>
                        </div>

                        <a
                          className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
                          href="https://linkedin.com"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="h-10 w-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors shrink-0">
                            <span className="material-symbols-outlined text-[20px]">hub</span>
                          </span>
                          <div>
                            <span className="font-label-sm text-label-sm text-outline uppercase">
                              Professional Profile
                            </span>
                            <div className="font-body-md text-body-md text-on-surface font-medium">
                              linkedin.com/in/chibuike-david
                            </div>
                          </div>
                        </a>

                        <a
                          className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
                          href="https://github.com"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="h-10 w-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors shrink-0">
                            <span className="material-symbols-outlined text-[20px]">code</span>
                          </span>
                          <div>
                            <span className="font-label-sm text-label-sm text-outline uppercase">
                              Code Repository
                            </span>
                            <div className="font-body-md text-body-md text-on-surface font-medium">
                              github.com/ifediora-david
                            </div>
                          </div>
                        </a>

                        <div className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-container">
                          <span className="h-10 w-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary shrink-0">
                            <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                          </span>
                          <div>
                            <span className="font-label-sm text-label-sm text-outline uppercase">
                              Current Base
                            </span>
                            <div className="font-body-md text-body-md text-on-surface font-medium">
                              COOU Igbariam / Anambra, Nigeria
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* University Verification Badge */}
                    <div className="p-4 rounded-2xl bg-surface-container flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-[24px]">
                        school
                      </span>
                      <div className="text-[12px] leading-tight text-on-surface-variant">
                        <span className="font-semibold text-on-surface">
                          Chukwuemeka Odumegwu Ojukwu University
                        </span>
                        <p>Faculty of Physical Sciences, Computer Science</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Message Form */}
                  <div className="lg:col-span-7 bg-surface-container rounded-3xl p-8 lg:p-10 shadow-xl">
                    <form className="space-y-6" onSubmit={handleContactSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            className="font-label-md text-label-md text-on-surface-variant font-medium"
                            htmlFor="full-name"
                          >
                            Full Name
                          </label>
                          <input
                            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all font-body-sm text-body-sm shadow-inner"
                            id="full-name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Ada Lovelace"
                            required
                            type="text"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            className="font-label-md text-label-md text-on-surface-variant font-medium"
                            htmlFor="email-address"
                          >
                            Email Address
                          </label>
                          <input
                            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all font-body-sm text-body-sm shadow-inner"
                            id="email-address"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            placeholder="you@organization.com"
                            required
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          className="font-label-md text-label-md text-on-surface-variant font-medium"
                          htmlFor="opportunity-type"
                        >
                          Subject / Opportunity Type
                        </label>
                        <select
                          className="w-full bg-surface-container-lowest text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all font-body-sm text-body-sm shadow-inner"
                          id="opportunity-type"
                          value={opportunityType}
                          onChange={(e) => setOpportunityType(e.target.value)}
                        >
                          <option className="bg-surface-container" value="internship">
                            Internship / Junior Role
                          </option>
                          <option className="bg-surface-container" value="project">
                            Freelance Web / UI Project
                          </option>
                          <option className="bg-surface-container" value="collaboration">
                            Academic &amp; Student Collaboration
                          </option>
                          <option className="bg-surface-container" value="other">
                            General Inquiry
                          </option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label
                          className="font-label-md text-label-md text-on-surface-variant font-medium"
                          htmlFor="message-content"
                        >
                          Message
                        </label>
                        <textarea
                          className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all font-body-sm text-body-sm resize-none shadow-inner"
                          id="message-content"
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          placeholder="Tell me about your team, the scope of the project, or how we might work together..."
                          required
                          rows={5}
                        />
                      </div>

                      <button
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold tracking-wide shadow-[0_0_24px_rgba(37,99,235,0.4)] hover:bg-inverse-primary hover:shadow-[0_0_32px_rgba(123,208,255,0.5)] transition-all duration-200 cursor-pointer"
                        type="submit"
                      >
                        <span>Send Message</span>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </button>

                      {submittedInfo && (
                        <div className="p-4 rounded-xl bg-surface-container-high text-secondary flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[20px] mt-0.5">
                              check_circle
                            </span>
                            <span className="font-body-sm text-body-sm">
                              Thank you, <strong>{submittedInfo.name}</strong>! Your message has
                              been prepared. I will respond to{" "}
                              <span className="underline">{submittedInfo.email}</span> as soon as
                              possible.
                            </span>
                          </div>
                          <button
                            type="button"
                            aria-label="Dismiss confirmation"
                            onClick={() => setSubmittedInfo(null)}
                            className="text-outline hover:text-on-surface cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                          </button>
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

      <Footer
        activeScreen={activeScreen}
        activeSection={activeSection}
        onNavigateSection={navigateToSection}
        onOpenResume={openResume}
      />
    </div>
  );
}
