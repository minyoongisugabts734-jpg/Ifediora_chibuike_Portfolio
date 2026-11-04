import React, { useState } from "react";

interface ExpenseEntry {
  id: string;
  label: string;
  category: "Academic & Books" | "Feeding" | "Commute" | "Data & Cloud";
  amount: number;
  date: string;
}

const INITIAL_EXPENSES: ExpenseEntry[] = [
  {
    id: "e1",
    label: "Management Strategy & Finance Texts",
    category: "Academic & Books",
    amount: 7500,
    date: "Nov 01",
  },
  {
    id: "e2",
    label: "Weekly Campus Provisions & Meals",
    category: "Feeding",
    amount: 14500,
    date: "Nov 02",
  },
  {
    id: "e3",
    label: "Igbariam — Awka Campus Transit",
    category: "Commute",
    amount: 4800,
    date: "Nov 03",
  },
  {
    id: "e4",
    label: "Monthly Fibre/LTE Developer Data Plan",
    category: "Data & Cloud",
    amount: 8000,
    date: "Nov 04",
  },
];

export const FinanceDemo: React.FC = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(50000);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(INITIAL_EXPENSES);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseEntry["category"]>("Academic & Books");

  const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);
  const netFlow = Math.max(0, monthlyBudget - totalSpent);
  const netPct = monthlyBudget > 0 ? ((netFlow / monthlyBudget) * 100).toFixed(1) : "0.0";

  const categories: ExpenseEntry["category"][] = [
    "Academic & Books",
    "Feeding",
    "Commute",
    "Data & Cloud",
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
    <div className="bg-surface-container-low rounded-2xl p-space-md lg:p-space-xl shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">query_stats</span>
          </div>
          <div>
            <div className="font-mono text-[11px] font-bold text-secondary uppercase">
              FINANCE MATRIX • LIVE SANDBOX
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Cash Flow, Expense Categorisation &amp; Goal Matrix
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-surface-container-lowest px-3.5 py-2 rounded-xl shadow-sm">
          <label
            htmlFor="budget-select"
            className="font-label-sm text-label-sm text-on-surface-variant font-semibold"
          >
            Monthly Inflow:
          </label>
          <select
            id="budget-select"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(Number(e.target.value))}
            className="bg-secondary-fixed text-secondary font-mono text-xs font-bold px-2.5 py-1 rounded-md outline-none"
          >
            <option value={40000}>₦40,000</option>
            <option value={50000}>₦50,000</option>
            <option value={65000}>₦65,000</option>
            <option value={85000}>₦85,000</option>
          </select>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <span className="font-label-sm text-label-sm text-outline">Total Monthly Inflow</span>
          <div className="font-headline-md text-headline-md text-on-surface font-bold mt-1 tabular-nums">
            ₦{monthlyBudget.toLocaleString()}
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Allocated operating budget
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <span className="font-label-sm text-label-sm text-outline">Categorised Outflow</span>
          <div className="font-headline-md text-headline-md text-on-surface font-bold mt-1 tabular-nums">
            ₦{totalSpent.toLocaleString()}
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {expenses.length} logged transactions
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <span className="font-label-sm text-label-sm text-outline">Monthly Net Flow</span>
          <div className="font-headline-md text-headline-md text-secondary font-bold mt-1 tabular-nums">
            ₦{netFlow.toLocaleString()}
          </div>
          <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-secondary-fixed text-secondary font-mono text-[11px] font-bold">
            +{netPct}% net retained
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left: Visual Bar Chart & Category Matrix */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Category Distribution
            </span>
            <span className="font-mono text-xs font-bold text-secondary">+{netPct}%</span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4">
            <div className="flex items-end gap-3 h-28 pt-2">
              {categories.map((cat, idx) => {
                const catSum = expenses
                  .filter((e) => e.category === cat)
                  .reduce((s, e) => s + e.amount, 0);
                const heightPct = Math.max(
                  14,
                  Math.min(100, Math.round((catSum / Math.max(1, monthlyBudget * 0.45)) * 100))
                );
                const barTones = [
                  "bg-secondary",
                  "bg-secondary-container",
                  "bg-primary-container",
                  "bg-tertiary-container",
                ];
                return (
                  <div key={cat} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="font-mono text-[10px] text-on-surface-variant tabular-nums">
                      ₦{(catSum / 1000).toFixed(1)}k
                    </span>
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${barTones[idx]}`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="font-label-sm text-[10px] text-on-surface-variant truncate max-w-full">
                      {cat.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => {
              const catTotal = expenses
                .filter((e) => e.category === cat)
                .reduce((s, e) => s + e.amount, 0);
              const pct =
                monthlyBudget > 0
                  ? Math.min(100, Math.round((catTotal / monthlyBudget) * 100))
                  : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between font-body-sm text-body-sm">
                    <span className="text-on-surface font-medium">{cat}</span>
                    <span className="font-mono text-xs text-on-surface-variant tabular-nums">
                      ₦{catTotal.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
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

        {/* Right: Quick Expense Entry & Ledger */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-5">
          <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Record Expense Entry
          </h4>
          <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Description (e.g. Course Textbook)"
              aria-label="Expense description"
              className="sm:col-span-5 px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="number"
              min="100"
              step="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₦ Amount"
              aria-label="Expense amount"
              className="sm:col-span-3 px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-mono text-xs outline-none focus:ring-2 focus:ring-secondary"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseEntry["category"])}
              aria-label="Expense category"
              className="sm:col-span-4 px-2.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-secondary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="sm:col-span-12 py-2.5 rounded-lg bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md shadow-sm transition-colors cursor-pointer"
            >
              Add to Ledger
            </button>
          </form>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {expenses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low"
              >
                <div>
                  <div className="font-body-sm text-body-sm text-on-surface font-medium">
                    {item.label}
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">
                    {item.category} • {item.date}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-on-surface font-bold tabular-nums">
                    -₦{item.amount.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    aria-label="Remove entry"
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
