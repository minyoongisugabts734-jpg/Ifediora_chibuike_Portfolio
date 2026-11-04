export type ProjectId = "productivity" | "finance" | "marketplace";
export type ProjectTab = "case-study" | "demo" | "architecture";

export interface ProjectItem {
  id: ProjectId;
  suiteLabel: string;
  suiteIcon: string;
  accentTone: "primary" | "secondary" | "tertiary";
  title: string;
  shortDescription: string;
  tags: { label: string; emphasized?: boolean }[];
  actionIcon: string;
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

export const HERO_PORTRAIT_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBbD1VGX5PRcsU1QXm87JivybrVo2Q-85hNWz-MQ8pUGKljzgxWD7sNF23Gy8T27hBdlz1rYgukWLCF80epqocmuK7goOhs9-Aa9YiQkiq3XeryXgnqLznAOEqOe_jMEbSxU5ZCSqLlk4q6GNCkrrFnskwrZHVKqt59II7yw6JQcc2_BSI1dUGO_budjJ8c0lUqyD8IP0jQHRIXbxctzAzmxEMYKlvYZFIK53HFapFLmbXNDNsg-ZZW6w";

export const CONTACT_INFO = {
  email: "Ifediorachibuike13@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/ifediora-chibuike-aab43a36a",
  linkedinHandle: "ifediora-chibuike-aab43a36a",
  githubUrl: "https://github.com",
  facebookUrl: "https://facebook.com",
  location: "COOU Igbariam, Anambra State, Nigeria",
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "productivity",
    suiteLabel: "v1.2.0 • ACADEMIC TOOL",
    suiteIcon: "timer",
    accentTone: "primary",
    title: "Student Productivity App",
    shortDescription:
      "A focused academic task management tool featuring semester milestone tracking, assignment countdowns, and customizable Pomodoro study cycles tailored for Nigerian university schedules.",
    tags: [
      { label: "UI Design" },
      { label: "JavaScript" },
      { label: "Productivity", emphasized: true },
    ],
    actionIcon: "code",
    githubUrl: "https://github.com",
    timeline: "8 Weeks • 2024 Academic Session",
    role: "Frontend Engineer & Digital Product Designer",
    context: "Designed for COOU Igbariam University Workflows",
    overview:
      "A focused academic task management utility uniting semester milestone tracking, departmental assignment countdowns, and customizable Pomodoro study cycles tailored for Nigerian university schedules.",
    problem:
      "University scholars balance dense departmental lectures, group presentations, and continuous assessment deadlines across fragmented WhatsApp notices and notebooks, causing avoidable scheduling bottlenecks.",
    solution:
      "Combined operational process clarity from Business Administration with clean JavaScript/React state architecture to ship a zero-friction study planner and synchronized Pomodoro tracker.",
    impactMetrics: [
      {
        label: "Milestone Adherence",
        value: "+42%",
        detail: "Higher on-time coursework completion across peer student testers",
      },
      {
        label: "Offline Reliability",
        value: "100%",
        detail: "Instant LocalStorage state persistence during low-connectivity hours",
      },
      {
        label: "Deep Work Cycles",
        value: "3.4 hrs/day",
        detail: "Average focused study sessions logged during exam preparation weeks",
      },
    ],
    architectureHighlights: [
      {
        title: "Drift-Free Pomodoro Interval Engine",
        description:
          "Calculates remaining focus seconds against monotonic timestamps so backgrounded browser tabs maintain exact accuracy.",
        codeSnippet: `export function getRemainingSeconds(targetEpochMs: number): number {
  const delta = Math.max(0, targetEpochMs - Date.now());
  return Math.ceil(delta / 1000);
}`,
      },
      {
        title: "Structured Semester Milestone Storage",
        description:
          "Serializes course tasks, priority statuses, and study cycle counters with schema versioning in LocalStorage.",
        codeSnippet: `const STORAGE_KEY = "icd_academic_tool_v1_2";
export const persistTasks = (items: MilestoneTask[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: "1.2.0", items }));`,
      },
    ],
    designDecisions: [
      {
        title: "Clarity-First Light Surface Hierarchy",
        detail:
          "Uses crisp white task cards over subtle lavender-tinted containers (#f2f3ff) so active deadlines stand out immediately without visual clutter.",
      },
      {
        title: "Operational Priority Grouping",
        detail:
          "Applies management workflow principles to group coursework by urgency and credit weight.",
      },
    ],
  },
  {
    id: "finance",
    suiteLabel: "FINANCE MATRIX",
    suiteIcon: "query_stats",
    accentTone: "secondary",
    title: "Personal Finance Dashboard",
    shortDescription:
      "Data-driven financial utility analyzing cash flow, expense categorisation, and goal tracking. Built with component reusability and responsive visual charts in mind.",
    tags: [
      { label: "React" },
      { label: "Data Visualization", emphasized: true },
      { label: "Responsive" },
    ],
    actionIcon: "launch",
    githubUrl: "https://github.com",
    timeline: "6 Weeks • 2024",
    role: "Frontend Developer & Financial UX Strategist",
    context: "Quantitative Personal Cashflow & Goal Analytics",
    overview:
      "A data-driven financial utility analyzing monthly Naira (₦) cash flow, structured expense categorisation, and savings goal velocity—bridging financial management principles with reusable React chart components.",
    problem:
      "Students and young professionals often track budgets mentally rather than quantitatively, making it difficult to spot category overspending before monthly cash reserves run low.",
    solution:
      "Engineered an interactive React analytics matrix that computes real-time net flow percentages, breaks spending into clear operational buckets, and visualizes weekly cash retention.",
    impactMetrics: [
      {
        label: "Monthly Net Flow",
        value: "+18.4%",
        detail: "Average positive savings variance modeled through upfront category caps",
      },
      {
        label: "Transaction Entry",
        value: "< 5 sec",
        detail: "Streamlined Naira quick-log form with instant chart recalculation",
      },
      {
        label: "Component Reuse",
        value: "92%",
        detail: "Modular KPI cards, bar charts, and ledger rows across breakpoints",
      },
    ],
    architectureHighlights: [
      {
        title: "Immutable Ledger & Net Flow Selector",
        description:
          "Derives category totals, burn percentages, and net savings directly from normalized transaction state.",
        codeSnippet: `const totalOutflow = transactions.reduce((sum, tx) => sum + tx.amount, 0);
const netRetention = Math.max(0, monthlyBudget - totalOutflow);
const netFlowPct = ((netRetention / monthlyBudget) * 100).toFixed(1);`,
      },
      {
        title: "Responsive Bar & Sparkline Primitives",
        description:
          "Renders crisp, hardware-accelerated CSS/SVG bar proportions scaled dynamically to peak monthly spend.",
        codeSnippet: `<div className="flex items-end gap-2 h-28">
  {weeklySeries.map((val, idx) => (
    <div key={idx} style={{ height: \`\${(val / maxVal) * 100}%\` }} className="flex-1 bg-secondary rounded-t" />
  ))}
</div>`,
      },
    ],
    designDecisions: [
      {
        title: "Executive Financial Readability",
        detail:
          "Pairs tabular numerals with clean Naira (₦) formatting and high-contrast ocean-blue accents (#006398) for trustworthy financial scanning.",
      },
      {
        title: "Instant Variance Feedback",
        detail:
          "Displays explicit percentage badges (+18.4%) alongside visual bars so users never rely on color alone.",
      },
    ],
  },
  {
    id: "marketplace",
    suiteLabel: "P2P EXCHANGE",
    suiteIcon: "storefront",
    accentTone: "tertiary",
    title: "Campus Marketplace",
    shortDescription:
      "A localized peer-to-peer textbook and student essentials exchange created for Chukwuemeka Odumegwu Ojukwu University students to securely trade course literature and gear.",
    tags: [
      { label: "Web Dev" },
      { label: "UX Research", emphasized: true },
      { label: "Prototyping" },
    ],
    actionIcon: "preview",
    githubUrl: "https://github.com",
    timeline: "10 Weeks • 2024",
    role: "UX Researcher & Product Prototyper",
    context: "COOU Igbariam Peer-to-Peer Student Exchange",
    overview:
      "A localized peer-to-peer textbook and student essentials exchange created for Chukwuemeka Odumegwu Ojukwu University (COOU) students to securely trade course literature, calculators, and hostel gear.",
    problem:
      "Graduating cohorts leave behind valuable Management and Science textbooks while incoming students pay full retail prices, as informal chat groups lack verification and structured campus handover.",
    solution:
      "Conducted campus UX discovery and prototyped a verified P2P marketplace featuring departmental badges, trusted Igbariam campus meetup points, escrow reservation holds, and direct peer messaging.",
    impactMetrics: [
      {
        label: "Discovery Interviews",
        value: "24 Scholars",
        detail: "Surveyed across Management Sciences, Physical Sciences, and Law",
      },
      {
        label: "Literature Savings",
        value: "~55% Off",
        detail: "Average peer textbook savings compared to new retail pricing",
      },
      {
        label: "Verification Trust",
        value: "4.9 / 5.0",
        detail: "Prototype usability score on Verified COOU Student trust markers",
      },
    ],
    architectureHighlights: [
      {
        title: "Instant Departmental & Category Search",
        description:
          "Client-side multi-criteria filtering across course codes, faculties, and item categories with zero network lag.",
        codeSnippet: `const matches = listings.filter((item) =>
  (activeDept === "All" || item.category === activeDept) &&
  item.title.toLowerCase().includes(searchTerm.toLowerCase())
);`,
      },
      {
        title: "Safe Campus Handover Workflow",
        description:
          "Models reservation holds and verified campus meetup checkpoints before funds are released.",
        codeSnippet: `type HandoverStatus = "VERIFIED_AVAILABLE" | "ESCROW_HELD" | "HANDOVER_COMPLETE";`,
      },
    ],
    designDecisions: [
      {
        title: "Verified Academic Identity",
        detail:
          "Places degree/faculty badges (B.Sc, Management Sciences) prominently on listing cards to establish immediate peer trust.",
      },
      {
        title: "Familiar COOU Meetup Landmarks",
        detail:
          "Anchors every listing to safe daytime campus locations on the Igbariam campus.",
      },
    ],
  },
];

export const RESUME_DATA = {
  fullName: "Ifediora Chibuike David",
  title: "B.Sc. Business Administration Scholar • Software Engineer & Digital Product Designer",
  location: "COOU Igbariam, Anambra State, Nigeria",
  email: CONTACT_INFO.email,
  linkedin: `linkedin.com/in/${CONTACT_INFO.linkedinHandle}`,
  linkedinUrl: CONTACT_INFO.linkedinUrl,
  github: "github.com/ifediora-chibuike",
  summary:
    "Tech enthusiast, aspiring software engineer, and digital product designer pursuing a Bachelor of Science in Business Administration at Chukwuemeka Odumegwu Ojukwu University (COOU), Igbariam (Class of 2025). Passionate about bridging rigorous business management strategies, organizational systems, and financial clarity with modern, high-performance React and JavaScript web development.",
  education: [
    {
      institution: "Chukwuemeka Odumegwu Ojukwu University (COOU), Igbariam",
      degree: "Bachelor of Science (B.Sc.) in Business Administration",
      period: "Class of 2025",
      faculty: "Faculty of Management Sciences",
      coursework: [
        "Organizational Behavior & Strategy",
        "Management Information Systems",
        "Financial Frameworks & Quantitative Analysis",
        "Operations & Project Delivery Management",
        "Entrepreneurship & Digital Innovation",
      ],
    },
  ],
  experience: [
    {
      role: "Frontend Developer & Digital Product Designer (Independent Portfolio)",
      organization: "Self-Directed Engineering & Campus Product Ventures",
      period: "2022 – Present",
      bullets: [
        "Designed and engineered pragmatic web applications—including a Student Productivity App, Personal Finance Matrix, and COOU Peer Marketplace—blending business process clarity with modern UI craftsmanship.",
        "Built responsive, accessible component architectures using HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), and React Hooks.",
        "Translated user research and strategic business workflows into interactive Figma design systems and working prototypes.",
      ],
    },
  ],
};
