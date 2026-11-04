import React, { useState } from "react";

export type AppScreen =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "contact"
  | "project-detail"
  | "resume";

interface HeaderProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const NAV_ITEMS: { id: AppScreen; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const Header: React.FC<HeaderProps> = ({ activeScreen, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, screen: AppScreen) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(screen);
  };

  const isNavItemActive = (itemId: AppScreen) => {
    if (itemId === "projects" && activeScreen === "project-detail") return true;
    return activeScreen === itemId;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-space-sm group whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container transition-colors">
            <span className="font-headline-sm text-headline-sm text-primary group-hover:text-on-primary transition-colors tracking-tight">
              ICD
            </span>
          </div>
          <span className="hidden sm:inline-block font-label-md text-label-md text-on-surface tracking-tight">
            Ifediora C. David
          </span>
        </a>

        {/* Desktop Navigation — Exact 5 screens from reference HTML */}
        <nav className="hidden md:flex items-center gap-space-lg">
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(item.id);
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active ? "page" : undefined}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? "font-label-md text-label-md text-primary font-bold"
                    : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-md shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:bg-primary hover:text-on-primary transition-all whitespace-nowrap"
          >
            Let&apos;s Talk
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate("resume");
            }}
            title="View Curriculum Vitae (CV)"
            aria-label="Open Curriculum Vitae"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeScreen === "resume"
                ? "bg-primary-container ring-4 ring-primary-fixed"
                : "bg-primary hover:bg-primary-container"
            }`}
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest/98 backdrop-blur-xl border-t border-outline-variant/40 px-margin-mobile py-4 space-y-2 shadow-lg">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item.id);
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3.5 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${
                    active
                      ? "bg-primary-fixed text-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
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
                onNavigate("resume");
              }}
              className={`text-left px-3.5 py-2.5 rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${
                activeScreen === "resume"
                  ? "bg-primary-fixed text-primary font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              Download / View CV
            </button>
          </div>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
