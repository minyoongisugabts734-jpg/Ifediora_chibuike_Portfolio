import React, { useState } from "react";
import { PROJECTS, ProjectId, RESUME_DATA } from "../data/portfolioData";

interface ResumeScreenProps {
  onBackToPortfolio: () => void;
  onOpenProject: (id: ProjectId) => void;
  onContact: () => void;
}

export const ResumeScreen: React.FC<ResumeScreenProps> = ({
  onBackToPortfolio,
  onOpenProject,
  onContact,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCV = () => {
    const cvContent = `IFEDIORA CHIBUIKE DAVID
${RESUME_DATA.title}
Location: ${RESUME_DATA.location}
Email: ${RESUME_DATA.email} | LinkedIn: ${RESUME_DATA.linkedin}

====================================================================
EXECUTIVE & TECHNICAL PROFILE
====================================================================
${RESUME_DATA.summary}

====================================================================
EDUCATION
====================================================================
${RESUME_DATA.education[0].degree}
${RESUME_DATA.education[0].institution} (${RESUME_DATA.education[0].period})
${RESUME_DATA.education[0].faculty}
Focus Areas: ${RESUME_DATA.education[0].coursework.join(" • ")}

====================================================================
COMPETENCY MATRIX
====================================================================
- Development: HTML5 Semantic Web, CSS3 & Tailwind CSS (Advanced), JavaScript ES6+, React & Hooks, Python, Git Version Control
- Design & UX: Figma UI / Design Systems, Wireframing & Sitemaps, Interactive Prototyping, Responsive Layouts, UI Accessibility
- Strategy & Soft Skills: Analytical Problem Solving, Technical Communication, Cross-Functional Synergy, Project Delivery Timelines, Organizational Strategy

====================================================================
PORTFOLIO HIGHLIGHTS
====================================================================
${PROJECTS.map(
  (p) => `* ${p.title} (${p.suiteLabel}) — ${p.role}
  Tags: ${p.tags.map((t) => t.label).join(", ")}
  Summary: ${p.shortDescription}`
).join("\n\n")}
`;

    const blob = new Blob([cvContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ifediora_Chibuike_David_CV.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="relative w-full overflow-hidden pb-space-xl">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-margin-mobile lg:px-margin-desktop pt-8 lg:pt-12 space-y-6">
        {/* Top Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">arrow_back</span>
            <span>Back to Portfolio</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>{downloaded ? "CV Downloaded" : "Download CV Copy"}</span>
            </button>
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        {downloaded && (
          <div className="p-space-md rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-between gap-3 font-body-sm text-body-sm">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                check_circle
              </span>
              <span>
                <strong>Ifediora_Chibuike_David_CV.txt</strong> has been downloaded to your device.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDownloaded(false)}
              className="text-on-secondary-fixed hover:text-primary cursor-pointer"
              aria-label="Dismiss notification"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Crisp Light CV Document */}
        <div className="bg-surface-container-low rounded-2xl p-space-lg lg:p-space-xl shadow-sm space-y-8">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-label-sm font-bold uppercase">
                Curriculum Vitae
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                {RESUME_DATA.fullName}
              </h1>
              <p className="font-body-md text-body-md text-primary font-semibold">
                {RESUME_DATA.title}
              </p>
            </div>
            <div className="space-y-1 font-label-sm text-label-sm text-on-surface-variant">
              <div>{RESUME_DATA.location}</div>
              <div>
                <a href={`mailto:${RESUME_DATA.email}`} className="hover:text-primary">
                  {RESUME_DATA.email}
                </a>
              </div>
              <div>
                <a
                  href={RESUME_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {RESUME_DATA.linkedin}
                </a>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Executive Summary
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Education */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-4">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Academic Foundation
            </span>
            {RESUME_DATA.education.map((edu) => (
              <div key={edu.institution} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {edu.degree}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {edu.institution} • {edu.faculty}
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-secondary font-mono text-xs font-bold w-fit">
                    {edu.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-4">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
              Engineering &amp; Product Experience
            </span>
            {RESUME_DATA.experience.map((exp) => (
              <div key={exp.role} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {exp.role}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {exp.organization}
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-tertiary-fixed text-tertiary font-mono text-xs font-bold w-fit">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2 list-disc list-inside font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Highlighted Projects */}
          <div className="space-y-3">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Selected Software Projects
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="font-mono text-[11px] font-bold text-outline">
                      {proj.suiteLabel}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                      {proj.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {proj.shortDescription}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProject(proj.id)}
                    className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold hover:underline cursor-pointer w-fit"
                  >
                    <span>Open Case Study</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
