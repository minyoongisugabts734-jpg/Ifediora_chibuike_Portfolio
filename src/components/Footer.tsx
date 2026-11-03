import React from "react";
import { NavSection } from "./Header";

interface FooterProps {
  activeScreen: "home" | "project" | "resume";
  activeSection: NavSection;
  onNavigateSection: (section: NavSection) => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeScreen,
  activeSection,
  onNavigateSection,
  onOpenResume,
}) => {
  const handleNav = (e: React.MouseEvent, section: NavSection) => {
    e.preventDefault();
    onNavigateSection(section);
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-xl items-start pb-space-xl">
          {/* Brand & Bio */}
          <div className="md:col-span-5 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="font-code-inline text-code-inline text-on-surface font-semibold">
                Ifediora.dev
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(123,208,255,0.8)]" />
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
              Ifediora Chibuike David
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Learning, building, and growing through technology. Computer Science scholar at
              Chukwuemeka Odumegwu Ojukwu University (COOU), Igbariam.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Navigation
            </span>
            <nav className="flex flex-col gap-space-xs">
              {(
                [
                  { id: "hero", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "skills", label: "Skills" },
                  { id: "projects", label: "Projects" },
                  { id: "contact", label: "Contact" },
                ] as { id: NavSection; label: string }[]
              ).map((item) => {
                const isActive = activeScreen === "home" && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => handleNav(e, item.id)}
                    className={`font-body-sm text-body-sm transition-colors w-fit ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={onOpenResume}
                className={`text-left font-body-sm text-body-sm transition-colors w-fit cursor-pointer ${
                  activeScreen === "resume"
                    ? "text-primary font-medium"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Curriculum Vitae (CV)
              </button>
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 flex flex-col gap-space-sm">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Connect
            </span>
            <div className="flex flex-col gap-space-xs">
              <a
                className="inline-flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors w-fit"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">code</span>
                <span>GitHub</span>
              </a>
              <a
                className="inline-flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors w-fit"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">hub</span>
                <span>LinkedIn</span>
              </a>
              <a
                className="inline-flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors w-fit"
                href="mailto:chibuike.david@example.com"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>Email</span>
              </a>
              <a
                className="inline-flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors w-fit"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-space-lg border-t border-outline-variant/15 flex flex-col md:flex-row items-center justify-between gap-space-md">
          <p className="font-label-md text-label-md text-outline">
            © 2025 Ifediora Chibuike David. All rights reserved.
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Student of Chukwuemeka Odumegwu Ojukwu University (COOU), Igbariam
          </p>
        </div>
      </div>
    </footer>
  );
};
