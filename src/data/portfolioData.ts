export type ProjectId = "productivity" | "finance" | "marketplace";
export type ProjectTab = "case-study" | "demo" | "architecture";

export interface ProjectItem {
  id: ProjectId;
  suiteLabel: string;
  suiteIcon: string;
  title: string;
  shortDescription: string;
  tags: string[];
  secondaryActionLabel: string;
  secondaryActionIcon: string;
  secondaryActionTab: ProjectTab;
  githubUrl: string;
  timeline: string;
  role: string;
  context: string;
  overview: string;
  problem: string;
  solution: string;
  impactMetrics: { label: string; value: string; detail: string }[];
  architectureHighlights: { title: string; description: string; codeSnippet: string }[];
  designDecisions: { title: string; detail: string }[];
}

export const PROFILE_AVATAR_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1XyxieOn7zCvQcbeP1o7Ran0wvbNHAWVpGWOtBZHOzeLIV43b0ZWhjqcQC2UQJzGkb7Wy3j2mwa1d8DAyRj4Cq7VGWT7w2qJoSnhNu1ecDMsno5JkdBqONvsBbOdrhljH64EcMEvunYWtGcF6qmgJhKzsk3_rXTn0FfOnof_v1tUa_n9p9V748e5_Eh-aBQXQJTcobQlwQAfyTnCfWVtOjyqRC891HEqguCVfY_YxNiUepcXFFbgGHc7tY";

export const HERO_PORTRAIT_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmNAY3B6IdwL2GFfzuzgemwTUWVbdJ4sDLG7Je4hdbp4XrMCqvl2lEPdEvXaZZ4Z0qYv3yP99iP_TTJbEWeFFbf4YI3-OjlWRa12icuylkcrRsPPL7QEAQvMemj6rbeRO0pOs9uJPO8Rn3ypGI_qiN35gWS4BpirCuq8JsjwCA4L2CTnnXh2xkEG32chaPlIlu8nRHtc2BsmIrocT8PnTWh_0bIXSFvcmp6JE_lq_JI5DMn6c7yhzhSw";

export const PROJECTS: ProjectItem[] = [
  {
    id: "productivity",
    suiteLabel: "Academic Suite v1.2",
    suiteIcon: "timer",
    title: "Student Productivity App",
    shortDescription:
      "A comprehensive web app helping university students organize academic schedules, assignment deadlines, and focused study sessions with Pomodoro integration.",
    tags: ["UI Design", "JavaScript", "LocalStorage", "Tailwind CSS"],
    secondaryActionLabel: "Interactive Workspace",
    secondaryActionIcon: "code",
    secondaryActionTab: "demo",
    githubUrl: "https://github.com",
    timeline: "8 Weeks · 2024 Academic Session",
    role: "Lead Frontend Developer & UI Designer",
    context: "Built for COOU Igbariam Computer Science Scholars",
    overview:
      "Academic Suite v1.2 unifies fragmented departmental lecture timetables, assignment queues, and Pomodoro study blocks into a distraction-free dark-mode workspace tailored to university students.",
    problem:
      "University students frequently juggle overlapping 300-level coursework, impromptu lab submissions, and exam preparation across scattered WhatsApp PDFs and paper notes—resulting in missed deadlines and unfocused study sessions.",
    solution:
      "Engineered an offline-resilient single-page workspace featuring course-tagged assignment queues, real-time daily completion progress, and an integrated Pomodoro focus timer synchronized with active courses like CMP 312: Algorithms.",
    impactMetrics: [
      {
        label: "Task Completion Rate",
        value: "+42%",
        detail: "Measured across 18 peer beta testers during mid-semester assessments",
      },
      {
        label: "Offline Persistence",
        value: "100%",
        detail: "Zero-latency state hydration via structured LocalStorage schemas",
      },
      {
        label: "Focus Block Average",
        value: "3.4 hrs/day",
        detail: "Sustained deep-work intervals logged per active exam week user",
      },
    ],
    architectureHighlights: [
      {
        title: "Deterministic Timer & Tabular State Engine",
        description:
          "Uses timestamp-delta reconciliation so backgrounded browser tabs never drift during 25-minute Pomodoro sprints.",
        codeSnippet: `export function computeRemainingSeconds(endTimeMs: number): number {
  const delta = Math.max(0, endTimeMs - Date.now());
  return Math.ceil(delta / 1000);
}`,
      },
      {
        title: "Schema-Versioned LocalStorage Persistence",
        description:
          "Persists COOU course queues, completion flags, and active session presets with automatic fallback recovery.",
        codeSnippet: `const STORAGE_KEY = "coou_academic_suite_v1_2";
export const saveQueue = (tasks: CourseTask[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, tasks }));`,
      },
    ],
    designDecisions: [
      {
        title: "Low-Glare Night Study Palette",
        detail:
          "Calibrated deep navy-slate surfaces (#0b1326 to #222a3d) to minimize eye strain during late-night hostel and library study hours.",
      },
      {
        title: "Course-Code First Hierarchy",
        detail:
          "Surfaces departmental codes (CMP 312, CMP 304, MTH 301) in monospace labels for instant visual scanning.",
      },
    ],
  },
  {
    id: "finance",
    suiteLabel: "Finance Tracker OS",
    suiteIcon: "analytics",
    title: "Personal Finance Dashboard",
    shortDescription:
      "A modern analytics concept empowering young adults to visualize spending patterns, track monthly allowance budgets, and set savings targets.",
    tags: ["React", "Data Visualisation", "Chart.js", "Responsive Design"],
    secondaryActionLabel: "Live Demo",
    secondaryActionIcon: "visibility",
    secondaryActionTab: "demo",
    githubUrl: "https://github.com",
    timeline: "6 Weeks · 2024",
    role: "Frontend Engineer & UX Researcher",
    context: "Student Allowance & Personal Budgeting Concept",
    overview:
      "Finance Tracker OS gives students and young professionals immediate clarity into monthly Naira (₦) cashflow, category burn rates, and automated micro-savings targets without requiring complex spreadsheet formulas.",
    problem:
      "Monthly student allowances often evaporate mid-month due to uncategorized daily expenses—transport, textbooks, mobile data, and feeding—leaving little room for emergency savings.",
    solution:
      "Designed a responsive React analytics dashboard that visualizes weekly spending curves, flags high-burn categories early, and calculates real-time savings velocity toward custom semester targets.",
    impactMetrics: [
      {
        label: "Average Monthly Saved",
        value: "+18.4%",
        detail: "Simulated allowance retention when setting upfront savings locks",
      },
      {
        label: "Expense Logging Time",
        value: "< 5 sec",
        detail: "Quick-entry Naira presets for common campus expense categories",
      },
      {
        label: "Viewport Adaptability",
        value: "320px–1440px",
        detail: "Fluid SVG sparklines and responsive grid cards across mobile & desktop",
      },
    ],
    architectureHighlights: [
      {
        title: "Derived Cashflow & Savings Aggregator",
        description:
          "Computes net allowance balance, savings percentage, and category proportions purely from immutable transaction ledgers.",
        codeSnippet: `const totalSpent = ledger
  .filter((tx) => tx.type === "expense")
  .reduce((sum, tx) => sum + tx.amount, 0);
const savingsRate = Math.round(((allowance - totalSpent) / allowance) * 1000) / 10;`,
      },
      {
        title: "Zero-Dependency Responsive SVG Sparklines",
        description:
          "Renders crisp vector budget trajectories with area gradients and interactive data inspection.",
        codeSnippet: `<svg viewBox="0 0 200 48" className="w-full h-16 text-secondary">
  <path d={sparklinePath} stroke="currentColor" strokeWidth="2.5" fill="none" />
</svg>`,
      },
    ],
    designDecisions: [
      {
        title: "Naira-Native Financial Formatting",
        detail:
          "Uses tabular numerals and localized ₦ currency formatting so balances align cleanly across summary cards.",
      },
      {
        title: "Actionable Variance Signals",
        detail:
          "Pairs color-coded budget indicators with explicit percentage labels (+18.4% saved) for accessible comprehension.",
      },
    ],
  },
  {
    id: "marketplace",
    suiteLabel: "Peer Commerce P2P",
    suiteIcon: "shopping_bag",
    title: "Campus Marketplace",
    shortDescription:
      "A student-centric peer-to-peer exchange platform for buying, selling, and swapping textbooks, electronics, and campus essentials safely.",
    tags: ["Web Development", "UX Research", "Prototyping", "Figma"],
    secondaryActionLabel: "Prototype",
    secondaryActionIcon: "open_in_new",
    secondaryActionTab: "demo",
    githubUrl: "https://github.com",
    timeline: "10 Weeks · 2024",
    role: "Product Designer & Frontend Prototyper",
    context: "Igbariam Campus Verified Peer-to-Peer Exchange",
    overview:
      "Campus Marketplace connects graduating students with incoming cohorts at COOU Igbariam to buy, sell, and swap textbooks, lab coats, calculators, and hostel appliances with campus-verified trust.",
    problem:
      "Buying brand-new Computer Science and Physical Sciences textbooks every semester is expensive, while informal social-media group sales suffer from unverified sellers, price haggling friction, and safety concerns.",
    solution:
      "Researched and prototyped a campus-gated marketplace featuring Faculty verification badges, designated campus meetup zones, escrow hold indicators, and instant buyer-seller chat.",
    impactMetrics: [
      {
        label: "User Interviews",
        value: "24 Students",
        detail: "Conducted across Physical Sciences, Engineering, and Management faculties",
      },
      {
        label: "Textbook Cost Savings",
        value: "~55% Off",
        detail: "Average secondhand discount compared to new bookshop retail prices",
      },
      {
        label: "Checkout Trust Score",
        value: "4.8 / 5.0",
        detail: "Usability testing rating on verified student badge & campus pickup flow",
      },
    ],
    architectureHighlights: [
      {
        title: "Multi-Facet Campus Filtering",
        description:
          "Filters peer listings instantaneously by faculty, item category, verification tier, and search query.",
        codeSnippet: `const visibleListings = listings.filter((item) =>
  (category === "All" || item.category === category) &&
  item.title.toLowerCase().includes(query.toLowerCase())
);`,
      },
      {
        title: "Escrow-Protected Handover State Machine",
        description:
          "Models safe student-to-student exchanges where funds release only upon mutual QR/PIN confirmation at campus landmarks.",
        codeSnippet: `type EscrowState = "AVAILABLE" | "RESERVED_IN_ESCROW" | "MEETUP_CONFIRMED";`,
      },
    ],
    designDecisions: [
      {
        title: "Instant Trust Signals on Listing Cards",
        detail:
          "Highlights seller faculty affiliation and Verified Student status directly beneath item pricing to eliminate buyer hesitation.",
      },
      {
        title: "Contextual Campus Meetup Tags",
        detail:
          "Replaces vague shipping estimates with familiar COOU Igbariam landmarks (Faculty Quadrangle, University Library, Student Center).",
      },
    ],
  },
];

export const RESUME_DATA = {
  fullName: "Ifediora Chibuike David",
  title: "Computer Science Undergraduate · Aspiring Full-Stack Developer & UI/UX Designer",
  location: "Igbariam / Awka, Anambra State, Nigeria",
  email: "chibuike.david@example.com",
  linkedin: "linkedin.com/in/chibuike-david",
  github: "github.com/ifediora-david",
  summary:
    "Motivated B.Sc. Computer Science scholar at Chukwuemeka Odumegwu Ojukwu University (COOU), Igbariam with hands-on experience designing and engineering responsive web applications. Combines strong foundations in HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React, and Python with human-centered Figma prototyping to build fast, accessible digital products.",
  education: [
    {
      institution: "Chukwuemeka Odumegwu Ojukwu University (COOU), Igbariam",
      degree: "Bachelor of Science (B.Sc.) in Computer Science",
      period: "2023 – Present (Expected 2027)",
      faculty: "Faculty of Physical Sciences",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Python)",
        "Discrete Mathematics",
        "Computer Architecture & Organization",
        "Database Management Systems",
        "Web Application Development",
      ],
    },
  ],
  experience: [
    {
      role: "Frontend Developer & UI/UX Designer (Independent Projects)",
      organization: "Self-Directed & Campus Tech Initiatives",
      period: "2023 – Present",
      bullets: [
        "Architected and shipped 5+ responsive web applications and interactive Figma prototypes addressing student productivity, personal finance, and peer commerce.",
        "Built reusable component libraries using React, TypeScript, and Tailwind CSS with strict attention to WCAG contrast, mobile responsiveness, and clean state management.",
        "Collaborated with fellow Computer Science students at COOU Igbariam on algorithm study groups, code reviews, and UI usability testing.",
      ],
    },
  ],
};
