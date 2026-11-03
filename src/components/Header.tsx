import React, { useState } from "react";
import { PROFILE_AVATAR_URL } from "../data/portfolioData";
import { SafeImage } from "./SafeImage";

export type NavSection = "hero" | "about" | "skills" | "projects" | "contact";

interface HeaderProps {
  activeScreen: "home" | "project" | "resume";
  activeSection: NavSection;
  onNavigateSection: (section: NavSection) => void;
  onOpenResume: () => void;
}

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  activeSection,
  onNavigateSection,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, section: NavSection) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateSection(section);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/15">
      <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex items-center gap-space-sm group focus:outline-none whitespace-nowrap shrink-0"
        >
          <span className="font-code-inline text-code-inline text-on-surface font-semibold tracking-tight transition-colors group-hover:text-primary">
            Ifediora.dev
          </span>
          <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,208,255,0.8)]" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-space-md p-space-xs">
          {NAV_ITEMS.map((item) => {
            const isActive =
              (activeScreen === "home" && activeSection === item.id) ||
              (activeScreen === "project" && item.id === "projects");

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-space-md py-space-xs rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-surface-container-highest text-primary font-semibold font-body-sm text-body-sm"
                    : "font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className={`px-space-md py-space-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeScreen === "resume"
                ? "bg-surface-container-highest text-primary font-semibold font-body-sm text-body-sm"
                : "font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            CV / Resume
          </button>
        </nav>

        {/* Right CTA & Profile Avatar */}
        <div className="flex items-center gap-space-md shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-medium tracking-wide shadow-[0_0_16px_rgba(37,99,235,0.35)] hover:bg-inverse-primary hover:shadow-[0_0_20px_rgba(123,208,255,0.5)] transition-all duration-200 whitespace-nowrap"
          >
            Let&apos;s Talk
          </a>
          <button
            type="button"
            onClick={onOpenResume}
            title="View Ifediora Chibuike David's CV"
            className="flex items-center pl-space-xs cursor-pointer focus:outline-none group"
          >
            <SafeImage
              src={PROFILE_AVATAR_URL}
              alt="Ifediora Chibuike David Profile"
              fallbackInitials="ID"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-secondary transition-all"
            />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden h-9 w-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-low/95 backdrop-blur-xl border-b border-outline-variant/30 px-6 py-4 space-y-2">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (activeScreen === "home" && activeSection === item.id) ||
                (activeScreen === "project" && item.id === "projects");

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-4 py-2.5 rounded-xl font-body-sm text-body-sm transition-colors ${
                    isActive
                      ? "bg-surface-container-highest text-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className={`text-left px-4 py-2.5 rounded-xl font-body-sm text-body-sm transition-colors cursor-pointer ${
                activeScreen === "resume"
                  ? "bg-surface-container-highest text-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              CV / Resume
            </button>
          </div>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold shadow-[0_0_16px_rgba(37,99,235,0.35)]"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
