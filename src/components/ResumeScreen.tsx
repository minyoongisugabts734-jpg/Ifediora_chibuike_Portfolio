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
Email: ${RESUME_DATA.email} | GitHub: ${RESUME_DATA.github} | LinkedIn: ${RESUME_DATA.linkedin}

====================================================================
PROFESSIONAL SUMMARY
====================================================================
${RESUME_DATA.summary}

====================================================================
EDUCATION
====================================================================
${RESUME_DATA.education[0].degree}
${RESUME_DATA.education[0].institution} (${RESUME_DATA.education[0].period})
${RESUME_DATA.education[0].faculty}
Relevant Coursework: ${RESUME_DATA.education[0].coursework.join(", ")}

====================================================================
CORE TECHNICAL SKILLS
====================================================================
- Frontend: HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React, TypeScript
- Backend & Scripting: Python, Node.js (Learning), RESTful API Integration
- Design & Tooling: Figma UI/UX Prototyping, Wireframing, Git & GitHub, VS Code

====================================================================
FEATURED SOFTWARE & DESIGN PROJECTS
====================================================================
${PROJECTS.map(
  (p) => `* ${p.title} (${p.suiteLabel}) — ${p.role}
  Stack: ${p.tags.join(", ")}
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
    <div className="relative w-full overflow-hidden pb-20">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-primary-container/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12 pt-10 lg:pt-14 space-y-8">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Portfolio</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-inverse-primary text-on-primary-container font-label-md text-label-md font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>{downloaded ? "CV Downloaded" : "Download CV Copy"}</span>
            </button>
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        {downloaded && (
          <div className="p-4 rounded-xl bg-surface-container-high text-secondary flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span className="font-body-sm text-body-sm">
                <strong>Ifediora_Chibuike_David_CV.txt</strong> has been downloaded to your device.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDownloaded(false)}
              className="text-outline hover:text-on-surface cursor-pointer"
              aria-label="Dismiss notification"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Resume Document Sheet */}
        <div className="bg-surface-container-low rounded-3xl p-8 lg:p-12 shadow-2xl space-y-10 border border-outline-variant/20">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-outline-variant/25">
            <div className="space-y-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Curriculum Vitae
              </span>
              <h1 className="font-headline-lg lg:text-display-mobile text-on-surface font-bold tracking-tight">
                {RESUME_DATA.fullName}
              </h1>
              <p className="font-body-md text-body-md text-primary font-medium">
                {RESUME_DATA.title}
              </p>
            </div>
            <div className="space-y-1 font-code-inline text-xs text-on-surface-variant">
              <div>{RESUME_DATA.location}</div>
              <div>{RESUME_DATA.email}</div>
              <div>{RESUME_DATA.github}</div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <h2 className="font-label-md text-label-md uppercase tracking-wider text-secondary">
              Profile Summary
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="font-label-md text-label-md uppercase tracking-wider text-secondary">
              Education
            </h2>
            {RESUME_DATA.education.map((edu) => (
              <div
                key={edu.institution}
                className="bg-surface-container rounded-2xl p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {edu.degree}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {edu.institution} · {edu.faculty}
                    </p>
                  </div>
                  <span className="font-code-inline text-xs text-secondary">{edu.period}</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase">
                    Relevant Coursework:
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {edu.coursework.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="font-label-md text-label-md uppercase tracking-wider text-secondary">
              Technical Experience &amp; Leadership
            </h2>
            {RESUME_DATA.experience.map((exp) => (
              <div key={exp.role} className="bg-surface-container rounded-2xl p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {exp.role}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {exp.organization}
                    </p>
                  </div>
                  <span className="font-code-inline text-xs text-secondary">{exp.period}</span>
                </div>
                <ul className="space-y-2 list-disc list-inside font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selected Projects */}
          <div className="space-y-4">
            <h2 className="font-label-md text-label-md uppercase tracking-wider text-secondary">
              Selected Engineering &amp; UI/UX Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-surface-container rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="font-label-sm text-label-sm text-outline">
                      {proj.suiteLabel}
                    </div>
                    <h3 className="font-body-lg text-body-lg text-on-surface font-semibold">
                      {proj.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {proj.shortDescription}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProject(proj.id)}
                    className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-primary transition-colors cursor-pointer w-fit"
                  >
                    <span>Inspect Case Study</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
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
