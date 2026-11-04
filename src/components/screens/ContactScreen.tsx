import React, { useState } from "react";
import { CONTACT_INFO } from "../../data/portfolioData";

export const ContactScreen: React.FC = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("internship");
  const [contactMessage, setContactMessage] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "sending") return;
    setSubmitState("sending");
    window.setTimeout(() => {
      setSubmitState("sent");
      setContactName("");
      setContactEmail("");
      setContactSubject("internship");
      setContactMessage("");
    }, 650);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Contact Split Section */}
      <section className="w-full py-space-xl lg:py-20">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12">
            {/* Left Column: Direct Channels & Availability */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-space-lg">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary-fixed/50 font-label-sm text-label-sm text-primary font-bold">
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Get In Touch</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl-mobile sm:text-headline-lg text-on-surface tracking-tight leading-[1.15]">
                  Have an Opportunity or Project in Mind?
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  I&apos;m always interested in learning, collaborating, and building something
                  meaningful. Whether it&apos;s an internship, software project, or tech dialogue,
                  my inbox is open.
                </p>
              </div>

              <div className="flex flex-col gap-space-sm">
                <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between gap-2 transition-colors group">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-space-sm min-w-0"
                  >
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-label-sm text-label-sm text-outline">Email Address</div>
                      <div className="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors truncate">
                        {CONTACT_INFO.email}
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded-md bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold shadow-sm hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer shrink-0"
                  >
                    {copiedEmail ? "Copied" : "Copy"}
                  </button>
                </div>

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
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                    arrow_outward
                  </span>
                </a>

                <a
                  className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between transition-colors group"
                  href={CONTACT_INFO.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-label-sm text-label-sm text-outline">GitHub</div>
                      <div className="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors truncate">
                        github.com • Ifediora Chibuike David
                      </div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
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
                  <span className="material-symbols-outlined text-outline-variant">public</span>
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

            {/* Right Column: Interactive Message Form */}
            <div className="lg:col-span-7 bg-surface-container-low p-space-md sm:p-space-xl rounded-2xl shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
                Send a Message
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                Fill out this brief form and I will get back to you promptly.
              </p>

              <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-sm text-label-sm text-on-surface font-semibold"
                      htmlFor="page-contact-name"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                      id="page-contact-name"
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
                      htmlFor="page-contact-email"
                    >
                      Email Address
                    </label>
                    <input
                      className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                      id="page-contact-email"
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
                    htmlFor="page-contact-subject"
                  >
                    Subject / Opportunity Type
                  </label>
                  <select
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                    id="page-contact-subject"
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
                    htmlFor="page-contact-message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all"
                    id="page-contact-message"
                    value={contactMessage}
                    onChange={(e) => {
                      setContactMessage(e.target.value);
                      if (submitState === "sent") setSubmitState("idle");
                    }}
                    placeholder="Tell me about your team, project requirements, or idea..."
                    required
                    rows={5}
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

          {/* Collaboration Readiness Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pt-4">
            <div className="bg-surface-container-low rounded-xl p-space-md space-y-1">
              <div className="font-label-sm text-label-sm text-primary font-bold uppercase">
                Availability
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Open for 2025 Roles
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Available for software engineering internships, junior frontend roles, and contract
                projects.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-md space-y-1">
              <div className="font-label-sm text-label-sm text-secondary font-bold uppercase">
                Work Arrangement
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Remote &amp; Hybrid
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Experienced collaborating asynchronously via Git, GitHub, Figma, and modern team
                workflows.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-md space-y-1">
              <div className="font-label-sm text-label-sm text-tertiary font-bold uppercase">
                Response Time
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Within 24 Hours
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Direct inquiries to {CONTACT_INFO.email} receive prompt follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
