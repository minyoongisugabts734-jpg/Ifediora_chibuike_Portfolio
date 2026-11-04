import React from "react";
import { AppScreen } from "./Header";
import { CONTACT_INFO } from "../data/portfolioData";

interface FooterProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ activeScreen, onNavigate }) => {
  const handleNav = (e: React.MouseEvent, screen: AppScreen) => {
    e.preventDefault();
    onNavigate(screen);
  };

  return (
    <footer className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-xl">
          {/* Brand & Academic Identity */}
          <div className="md:col-span-5 flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-label-md text-label-md text-on-primary font-bold">ICD</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Ifediora Chibuike David
              </h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-sm">
              Learning, building, and growing through technology.
            </p>
            <div className="mt-space-sm flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">school</span>
              <span className="font-label-sm text-label-sm">
                Faculty of Management Sciences • Chukwuemeka Odumegwu Ojukwu University (COOU),
                Igbariam
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 flex flex-col gap-space-xs">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-space-xs">
              Quick Navigation
            </h4>
            <nav className="flex flex-col gap-space-xs">
              {(
                [
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "skills", label: "Skills & Methodologies" },
                  { id: "projects", label: "Projects" },
                  { id: "contact", label: "Contact" },
                ] as { id: AppScreen; label: string }[]
              ).map((item) => {
                const isActive =
                  activeScreen === item.id ||
                  (item.id === "projects" && activeScreen === "project-detail");
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => handleNav(e, item.id)}
                    className={`transition-colors w-fit ${
                      isActive
                        ? "text-primary font-bold font-body-sm text-body-sm"
                        : "font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-4 flex flex-col gap-space-xs">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-space-xs">
              Connect &amp; Social
            </h4>
            <div className="flex flex-col gap-space-xs">
              <a
                className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors w-fit"
                href={`mailto:${CONTACT_INFO.email}`}
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                {CONTACT_INFO.email}
              </a>
              <a
                className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors w-fit"
                href={CONTACT_INFO.linkedinUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                LinkedIn • Ifediora Chibuike David
              </a>
              <a
                className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors w-fit"
                href={CONTACT_INFO.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">code</span>
                GitHub • Ifediora Chibuike David
              </a>
              <a
                className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors w-fit"
                href={CONTACT_INFO.facebookUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
                Facebook • Ifediora Chibuike David
              </a>
            </div>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant">
          <p className="font-body-sm text-body-sm text-center sm:text-left">
            © 2025 Ifediora Chibuike David. All rights reserved.
          </p>
          <p className="font-label-sm text-label-sm text-center sm:text-right">
            Anambra State, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};
