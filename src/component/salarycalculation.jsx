// frontend/src/component/salarycalculation.jsx
import React, { useState } from "react";
import { haptics } from "./haptics";

export default function SalaryCalculation({ t, lang, theme, onSalaryCalculated }) {
  const isRtl = lang === "ar";
  const isDark = theme === "dark";

  const [salary, setSalary] = useState("");
  const [rent, setRent] = useState("");
  const [errors, setErrors] = useState({});
  const [calculatedData, setCalculatedData] = useState(null);

  const validate = () => {
    const e = {};
    if (!salary || isNaN(Number(salary)) || Number(salary) <= 0) e.salary = t.errRequired || "Required";
    if (rent === "" || isNaN(Number(rent)) || Number(rent) < 0) e.rent = t.errRequired || "Required";
    return e;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    haptics.click();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setCalculatedData(null);
      return;
    }
    setErrors({});

    const monthlySalary = Number(salary);
    const monthlyRent = Number(rent);
    const ratio = monthlySalary > 0 ? (monthlyRent / monthlySalary) * 100 : 0;
    const remaining = Math.max(0, monthlySalary - monthlyRent);
    const rentPercentage = Math.min(100, Math.round(ratio));
    const remainingPercentage = 100 - rentPercentage;

    setCalculatedData({
      rentPercentage,
      remainingPercentage,
      monthlyRent,
      remaining,
      isStressed: ratio > 35
    });

    // Pass data back up to sync with the cost ledger ceiling matrix
    if (onSalaryCalculated) onSalaryCalculated(monthlySalary);
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetRent = calculatedData
    ? circumference - (calculatedData.rentPercentage / 100) * circumference
    : circumference;

  return (
    <div className="space-y-6">
      <form onSubmit={handleCalculate} className="space-y-4" dir={isRtl ? "rtl" : "ltr"}>
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            {t.lblMonthlySalary}
          </label>
          <input
            type="number"
            min="1"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="e.g. 800"
            className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-150 ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-600" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            } ${errors.salary ? "border-red-600" : ""}`}
          />
          {errors.salary && <p className="mt-1 text-xs text-red-500">{errors.salary}</p>}
        </div>

        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            {t.lblHousingRent}
          </label>
          <input
            type="number"
            min="0"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="e.g. 250"
            className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-150 ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-600" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            } ${errors.rent ? "border-red-600" : ""}`}
          />
          {errors.rent && <p className="mt-1 text-xs text-red-500">{errors.rent}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl shadow-md transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {isRtl ? "احسب توزيع الميزانية" : "Calculate Budget Allocation"}
        </button>
      </form>

      {calculatedData && (
        <div className="flex flex-col items-center gap-6 animate-fade-in" dir={isRtl ? "rtl" : "ltr"}>
          
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={radius} fill="transparent" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={calculatedData.isStressed ? "#ef4444" : "#14b8a6"}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffsetRent}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute text-center">
              <span className={`text-xl font-extrabold tabular-nums block ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {calculatedData.rentPercentage}%
              </span>
            </div>
          </div>

          {/* Formatted cleanly and positioned completely underneath the donut circle vector */}
          <div className="text-center w-full">
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase block mb-3">
              {t.lblRentRatio}
            </span>
            
            <div className={`border p-4 rounded-xl shadow-inner transition-colors duration-300 w-full mb-4 text-start ${
              calculatedData.isStressed ? "bg-red-500/10 border-red-500/30 text-red-200" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
            }`}>
              <h4 className="text-xs font-bold mb-1 flex items-center gap-2">
                {calculatedData.isStressed ? t.alertStressTitle : t.alertSafeTitle}
              </h4>
              <p className={`text-[11px] leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {calculatedData.isStressed ? t.alertStressDesc : t.alertSafeDesc}
              </p>
            </div>

            <div className={`border rounded-xl p-4 space-y-3 text-start w-full ${isDark ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200"}`}>
              <div className="flex items-center justify-between border-b pb-2 border-dashed border-slate-700/40">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-sm ${calculatedData.isStressed ? "bg-red-500" : "bg-teal-500"}`} />
                  <span className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>{t.lblChartRentShare}</span>
                </div>
                <span className={`text-xs font-bold font-mono ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                  {calculatedData.monthlyRent.toLocaleString()} {t.unitOmr}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-sm ${isDark ? "bg-slate-700" : "bg-slate-300"}`} />
                  <span className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>{t.lblChartRemaining}</span>
                </div>
                <span className={`text-xs font-bold font-mono ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                  {calculatedData.remaining.toLocaleString()} {t.unitOmr}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
