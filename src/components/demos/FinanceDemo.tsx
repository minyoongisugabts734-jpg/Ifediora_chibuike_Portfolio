import React, { useState } from "react";

interface ExpenseEntry {
  id: string;
  label: string;
  category: "Academic" | "Feeding" | "Transport" | "Data & Utilities";
  amount: number;
  date: string;
}

const INITIAL_EXPENSES: ExpenseEntry[] = [
  {
    id: "e1",
    label: "Algorithms & Discrete Math Handouts",
    category: "Academic",
    amount: 6500,
    date: "Nov 01",
  },
  {
    id: "e2",
    label: "Weekly Hostel Groceries & Rice",
    category: "Feeding",
    amount: 14200,
    date: "Nov 02",
  },
  {
    id: "e3",
    label: "Campus Shuttle & Awka Commute",
    category: "Transport",
    amount: 4800,
    date: "Nov 02",
  },
  {
    id: "e4",
    label: "Monthly Coding & Research Data Plan",
    category: "Data & Utilities",
    amount: 7000,
    date: "Nov 03",
  },
];

export const FinanceDemo: React.FC = () => {
  const [monthlyAllowance, setMonthlyAllowance] = useState<number>(45000);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(INITIAL_EXPENSES);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseEntry["category"]>("Academic");

  const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);
  const netSavings = Math.max(0, monthlyAllowance - totalSpent);
  const savingsPct =
    monthlyAllowance > 0 ? ((netSavings / monthlyAllowance) * 100).toFixed(1) : "0.0";

  const categories: ExpenseEntry["category"][] = [
    "Academic",
    "Feeding",
    "Transport",
    "Data & Utilities",
  ];

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(amount);
    if (!label.trim() || Number.isNaN(numeric) || numeric <= 0) return;
    setExpenses((prev) => [
      {
        id: `exp-${Date.now()}`,
        label: label.trim(),
        category,
        amount: numeric,
        date: "Today",
      },
      ...prev,
    ]);
    setLabel("");
    setAmount("");
  };

  return (
    <div className="bg-surface-container-low rounded-3xl p-6 lg:p-8 shadow-xl border border-outline-variant/20 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">analytics</span>
          </span>
          <div>
            <div className="font-label-sm text-label-sm text-secondary uppercase">
              Finance Tracker OS · Interactive Sandbox
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Student Monthly Allowance &amp; Savings Analytics
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-surface-container px-4 py-2 rounded-xl">
          <label
            htmlFor="allowance-select"
            className="font-label-sm text-label-sm text-outline uppercase"
          >
            Monthly Allowance:
          </label>
          <select
            id="allowance-select"
            value={monthlyAllowance}
            onChange={(e) => setMonthlyAllowance(Number(e.target.value))}
            className="bg-surface-container-lowest text-secondary font-code-inline text-sm px-2.5 py-1 rounded-lg focus:outline-none"
          >
            <option value={35000}>₦35,000</option>
            <option value={45000}>₦45,000</option>
            <option value={60000}>₦60,000</option>
            <option value={80000}>₦80,000</option>
          </select>
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container rounded-2xl p-5">
          <span className="font-label-sm text-label-sm text-outline uppercase">
            Monthly Allowance
          </span>
          <div className="font-headline-md text-headline-md text-on-surface font-bold mt-1 tabular-nums">
            ₦{monthlyAllowance.toLocaleString()}
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Active semester budget ceiling
          </span>
        </div>

        <div className="bg-surface-container rounded-2xl p-5">
          <span className="font-label-sm text-label-sm text-outline uppercase">
            Total Logged Spend
          </span>
          <div className="font-headline-md text-headline-md text-tertiary font-bold mt-1 tabular-nums">
            ₦{totalSpent.toLocaleString()}
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Across {expenses.length} recorded transactions
          </span>
        </div>

        <div className="bg-surface-container rounded-2xl p-5">
          <span className="font-label-sm text-label-sm text-outline uppercase">
            Projected Savings
          </span>
          <div className="font-headline-md text-headline-md text-secondary font-bold mt-1 tabular-nums">
            ₦{netSavings.toLocaleString()}
          </div>
          <span className="font-code-inline text-xs text-secondary">
            +{savingsPct}% retained this month
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Trend & Category Breakdown */}
        <div className="lg:col-span-6 bg-surface-container rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Budget Flow &amp; Category Allocation
            </span>
            <span className="font-code-inline text-xs text-secondary">+{savingsPct}% saved</span>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-4">
            <svg
              className="w-full h-24 text-primary"
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
                opacity="0.14"
              />
            </svg>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => {
              const catTotal = expenses
                .filter((e) => e.category === cat)
                .reduce((s, e) => s + e.amount, 0);
              const pct =
                monthlyAllowance > 0
                  ? Math.min(100, Math.round((catTotal / monthlyAllowance) * 100))
                  : 0;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between font-body-sm text-body-sm">
                    <span className="text-on-surface font-medium">{cat}</span>
                    <span className="font-code-inline text-xs text-on-surface-variant tabular-nums">
                      ₦{catTotal.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-lowest overflow-hidden">
                    <div
                      className="h-full rounded-full bg-secondary transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Expense Logger & Ledger */}
        <div className="lg:col-span-6 bg-surface-container rounded-2xl p-6 space-y-5">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Log Campus Expense
          </h4>
          <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Expense item (e.g. Lab Manual)"
              aria-label="Expense description"
              className="sm:col-span-5 bg-surface-container-lowest text-on-surface placeholder:text-outline px-3 py-2.5 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="number"
              min="100"
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₦ Amount"
              aria-label="Amount in Naira"
              className="sm:col-span-3 bg-surface-container-lowest text-on-surface placeholder:text-outline px-3 py-2.5 rounded-xl font-code-inline text-xs focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseEntry["category"])}
              aria-label="Expense category"
              className="sm:col-span-4 bg-surface-container-lowest text-on-surface px-2.5 py-2.5 rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="sm:col-span-12 py-2.5 rounded-xl bg-primary-container hover:bg-inverse-primary text-on-primary-container font-label-md text-label-md font-semibold transition-colors cursor-pointer"
            >
              Record Transaction
            </button>
          </form>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {expenses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low"
              >
                <div>
                  <div className="font-body-sm text-body-sm text-on-surface font-medium">
                    {item.label}
                  </div>
                  <div className="font-label-sm text-label-sm text-outline">
                    {item.category} · {item.date}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-code-inline text-sm text-on-surface font-semibold tabular-nums">
                    -₦{item.amount.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    aria-label="Remove transaction"
                    onClick={() =>
                      setExpenses((prev) => prev.filter((entry) => entry.id !== item.id))
                    }
                    className="text-outline hover:text-error transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
